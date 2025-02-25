import pytest
from django.test import TestCase
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime

from .models import (
    Trivia, Campus, Gamekeeper, Player, Task, Card, Checkpoint,
    GamekeeperTask, PlayerTask, Purchases, Visits, TaskCheckpoint
)

class TriviaModelTest(TestCase):
    def test_trivia_creation(self):
        """Test creating a Trivia instance with required fields"""
        trivia = Trivia.objects.create(
            name="Test Trivia",
            description="This is a test trivia"
        )
        self.assertEqual(trivia.name, "Test Trivia")
        self.assertEqual(trivia.description, "This is a test trivia")
        self.assertIsNotNone(trivia.trivia_id)

    def test_trivia_blank_description(self):
        """Test that description field can be blank"""
        trivia = Trivia.objects.create(name="Test Trivia")
        self.assertEqual(trivia.description, "")


class CampusModelTest(TestCase):
    def test_campus_creation(self):
        """Test creating a Campus instance with all fields"""
        campus = Campus.objects.create(
            name="North Campus",
            location="123 University Ave"
        )
        self.assertEqual(campus.name, "North Campus")
        self.assertEqual(campus.location, "123 University Ave")
        self.assertIsNotNone(campus.campus_id)


class GamekeeperModelTest(TestCase):
    def setUp(self):
        self.campus = Campus.objects.create(
            name="Test Campus",
            location="Test Location"
        )

    def test_gamekeeper_creation(self):
        """Test creating a Gamekeeper instance with all required fields"""
        gamekeeper = Gamekeeper.objects.create(
            name="Test Gamekeeper",
            password="secure_password",
            campus=self.campus
        )
        self.assertEqual(gamekeeper.name, "Test Gamekeeper")
        self.assertEqual(gamekeeper.password, "secure_password")
        self.assertEqual(gamekeeper.campus, self.campus)
        self.assertIsNotNone(gamekeeper.gamekeeper_id)

    def test_gamekeeper_campus_deletion(self):
        """Test that when a Campus is deleted, related Gamekeepers are also deleted"""
        gamekeeper = Gamekeeper.objects.create(
            name="Test Gamekeeper",
            password="secure_password",
            campus=self.campus
        )
        gamekeeper_id = gamekeeper.gamekeeper_id
        self.campus.delete()
        with self.assertRaises(Gamekeeper.DoesNotExist):
            Gamekeeper.objects.get(gamekeeper_id=gamekeeper_id)


class PlayerModelTest(TestCase):
    def setUp(self):
        self.campus = Campus.objects.create(
            name="Test Campus",
            location="Test Location"
        )
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword"
        )
        self.card = Card.objects.create(
            name="Test Card",
            description="Test Card Description",
            rarity="Common"
        )

    def test_player_creation(self):
        """Test creating a Player instance with required fields"""
        player = Player.objects.create(
            user=self.user,
            username="PlayerUsername",
            campus=self.campus
        )
        self.assertEqual(player.username, "PlayerUsername")
        self.assertEqual(player.points, 0)  # Default value
        self.assertEqual(player.campus, self.campus)
        self.assertEqual(player.user, self.user)
        self.assertIsNotNone(player.player_id)

    def test_player_add_card_to_deck(self):
        """Test adding a card to player's deck"""
        player = Player.objects.create(
            user=self.user,
            username="PlayerUsername",
            campus=self.campus
        )
        player.deck.add(self.card)
        self.assertEqual(player.deck.count(), 1)
        self.assertEqual(player.deck.first(), self.card)


class TaskModelTest(TestCase):
    def test_task_creation(self):
        """Test creating a Task instance with required fields"""
        task = Task.objects.create(
            title="Test Task",
            description="Test Task Description",
            points=10
        )
        self.assertEqual(task.title, "Test Task")
        self.assertEqual(task.description, "Test Task Description")
        self.assertEqual(task.points, 10)
        self.assertEqual(task.task_frame, "")  # Default blank
        self.assertEqual(task.kind, "")  # Default blank
        self.assertIsNotNone(task.task_id)


class CardModelTest(TestCase):
    def test_card_creation(self):
        """Test creating a Card instance with required fields"""
        card = Card.objects.create(
            name="Test Card",
            description="Test Card Description",
            rarity="Legendary"
        )
        self.assertEqual(card.name, "Test Card")
        self.assertEqual(card.description, "Test Card Description")
        self.assertEqual(card.rarity, "Legendary")
        self.assertIsNotNone(card.card_id)


class CheckpointModelTest(TestCase):
    def setUp(self):
        self.campus = Campus.objects.create(
            name="Test Campus",
            location="Test Location"
        )

    def test_checkpoint_creation(self):
        """Test creating a Checkpoint instance with required fields"""
        checkpoint = Checkpoint.objects.create(
            name="Test Checkpoint",
            location="Test Location",
            type=Checkpoint.CheckpointType.BUS,
            campus=self.campus
        )
        self.assertEqual(checkpoint.name, "Test Checkpoint")
        self.assertEqual(checkpoint.location, "Test Location")
        self.assertEqual(checkpoint.type, "bus")
        self.assertEqual(checkpoint.campus, self.campus)
        self.assertIsNotNone(checkpoint.checkpoint_id)

    def test_checkpoint_valid_types(self):
        """Test that only valid checkpoint types are accepted"""
        # Bus type (valid)
        checkpoint1 = Checkpoint.objects.create(
            name="Bus Stop",
            location="Main St",
            type=Checkpoint.CheckpointType.BUS,
            campus=self.campus
        )
        self.assertEqual(checkpoint1.type, "bus")

        # Cycling type (valid)
        checkpoint2 = Checkpoint.objects.create(
            name="Bike Rack",
            location="Park Ave",
            type=Checkpoint.CheckpointType.CYCLING,
            campus=self.campus
        )
        self.assertEqual(checkpoint2.type, "cycling")

        # Recycle type (valid)
        checkpoint3 = Checkpoint.objects.create(
            name="Recycling Center",
            location="Green St",
            type=Checkpoint.CheckpointType.RECYCLE,
            campus=self.campus
        )
        self.assertEqual(checkpoint3.type, "recycle")


class GamekeeperTaskModelTest(TestCase):
    def setUp(self):
        self.campus = Campus.objects.create(
            name="Test Campus",
            location="Test Location"
        )
        self.gamekeeper = Gamekeeper.objects.create(
            name="Test Gamekeeper",
            password="secure_password",
            campus=self.campus
        )
        self.task = Task.objects.create(
            title="Test Task",
            description="Test Task Description",
            points=10
        )

    def test_gamekeeper_task_creation(self):
        """Test creating a GamekeeperTask instance"""
        gamekeeper_task = GamekeeperTask.objects.create(
            gamekeeper=self.gamekeeper,
            task=self.task
        )
        self.assertEqual(gamekeeper_task.gamekeeper, self.gamekeeper)
        self.assertEqual(gamekeeper_task.task, self.task)

    def test_gamekeeper_task_unique_constraint(self):
        """Test that a gamekeeper cannot be assigned the same task twice"""
        GamekeeperTask.objects.create(
            gamekeeper=self.gamekeeper,
            task=self.task
        )
        # Attempting to create a duplicate assignment should raise IntegrityError
        with self.assertRaises(IntegrityError):
            GamekeeperTask.objects.create(
                gamekeeper=self.gamekeeper,
                task=self.task
            )


class PlayerTaskModelTest(TestCase):
    def setUp(self):
        self.campus = Campus.objects.create(
            name="Test Campus",
            location="Test Location"
        )
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword"
        )
        self.player = Player.objects.create(
            user=self.user,
            username="PlayerUsername",
            campus=self.campus
        )
        self.task = Task.objects.create(
            title="Test Task",
            description="Test Task Description",
            points=10
        )

    def test_player_task_creation(self):
        """Test creating a PlayerTask instance"""
        player_task = PlayerTask.objects.create(
            player=self.player,
            task=self.task,
            completed=False
        )
        self.assertEqual(player_task.player, self.player)
        self.assertEqual(player_task.task, self.task)
        self.assertFalse(player_task.completed)

    def test_player_task_unique_constraint(self):
        """Test that a player cannot have duplicate task assignments"""
        PlayerTask.objects.create(
            player=self.player,
            task=self.task
        )
        # Attempting to create a duplicate assignment should raise IntegrityError
        with self.assertRaises(IntegrityError):
            PlayerTask.objects.create(
                player=self.player,
                task=self.task
            )

    def test_player_task_update_completed(self):
        """Test updating a PlayerTask's completed status"""
        player_task = PlayerTask.objects.create(
            player=self.player,
            task=self.task,
            completed=False
        )
        player_task.completed = True
        player_task.save()
        
        # Refresh from database
        updated_task = PlayerTask.objects.get(player=self.player, task=self.task)
        self.assertTrue(updated_task.completed)


class PurchasesModelTest(TestCase):
    def setUp(self):
        self.campus = Campus.objects.create(
            name="Test Campus",
            location="Test Location"
        )
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword"
        )
        self.player = Player.objects.create(
            user=self.user,
            username="PlayerUsername",
            campus=self.campus
        )
        self.card = Card.objects.create(
            name="Test Card",
            description="Test Card Description",
            rarity="Common"
        )

    def test_purchase_creation(self):
        """Test creating a purchase record"""
        purchase = Purchases.objects.create(
            player=self.player,
            card=self.card
        )
        self.assertEqual(purchase.player, self.player)
        self.assertEqual(purchase.card, self.card)
        self.assertIsNotNone(purchase.purchase_time)


class VisitsModelTest(TestCase):
    def setUp(self):
        self.campus = Campus.objects.create(
            name="Test Campus",
            location="Test Location"
        )
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword"
        )
        self.player = Player.objects.create(
            user=self.user,
            username="PlayerUsername",
            campus=self.campus
        )
        self.checkpoint = Checkpoint.objects.create(
            name="Test Checkpoint",
            location="Test Location",
            type=Checkpoint.CheckpointType.BUS,
            campus=self.campus
        )

    def test_visit_creation(self):
        """Test creating a visit record"""
        visit = Visits.objects.create(
            player=self.player,
            checkpoint=self.checkpoint
        )
        self.assertEqual(visit.player, self.player)
        self.assertEqual(visit.checkpoint, self.checkpoint)
        self.assertIsNotNone(visit.visited_time)


class TaskCheckpointModelTest(TestCase):
    def setUp(self):
        self.campus = Campus.objects.create(
            name="Test Campus",
            location="Test Location"
        )
        self.task = Task.objects.create(
            title="Test Task",
            description="Test Task Description",
            points=10
        )
        self.checkpoint = Checkpoint.objects.create(
            name="Test Checkpoint",
            location="Test Location",
            type=Checkpoint.CheckpointType.BUS,
            campus=self.campus
        )

    def test_task_checkpoint_creation(self):
        """Test creating a TaskCheckpoint instance"""
        task_checkpoint = TaskCheckpoint.objects.create(
            task=self.task,
            checkpoint=self.checkpoint
        )
        self.assertEqual(task_checkpoint.task, self.task)
        self.assertEqual(task_checkpoint.checkpoint, self.checkpoint)

    def test_task_checkpoint_unique_constraint(self):
        """Test that a task cannot be assigned to the same checkpoint twice"""
        TaskCheckpoint.objects.create(
            task=self.task,
            checkpoint=self.checkpoint
        )
        # Attempting to create a duplicate assignment should raise IntegrityError
        with self.assertRaises(IntegrityError):
            TaskCheckpoint.objects.create(
                task=self.task,
                checkpoint=self.checkpoint
            )