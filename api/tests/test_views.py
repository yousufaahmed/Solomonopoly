from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from myapp.models import Player, Task, Card, Purchases, PlayerTask

class UserTests(APITestCase):
    def test_create_user(self):
        response = self.client.post("/api/users/", {"username": "testuser", "password": "testpass"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class PlayerTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.player = Player.objects.create(player_id=1, user=self.user, points=100)

    def test_get_player_list_admin_only(self):
        response = self.client.get("/api/players/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)  # Requires admin

    def test_get_player_detail_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/players/{self.player.player_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["points"], 100)

class TaskTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username="admin", password="adminpass")
        self.task = Task.objects.create(task_id=1, name="Test Task", description="A test task")

    def test_get_task_list_admin_only(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get("/api/tasks/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TaskAssignmentTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.player = Player.objects.create(player_id=1, user=self.user, points=100)
        self.task = Task.objects.create(task_id=1, name="Test Task", description="A test task")

    def test_assign_task_to_player(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f"/api/players/{self.player.player_id}/assign-task/", {"task": self.task.task_id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class PurchaseTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.player = Player.objects.create(player_id=1, user=self.user, points=100)
        self.card = Card.objects.create(card_id=1, name="Test Card", price=50)

    def test_create_purchase_record(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f"/api/players/{self.player.player_id}/purchase/", {"card": self.card.card_id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class LeaderboardTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="user1", password="pass")
        self.user2 = User.objects.create_user(username="user2", password="pass")
        self.player1 = Player.objects.create(player_id=1, user=self.user1, points=200)
        self.player2 = Player.objects.create(player_id=2, user=self.user2, points=100)

    def test_leaderboard_order(self):
        response = self.client.get("/api/leaderboard/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(response.data[0]["points"], response.data[1]["points"])
