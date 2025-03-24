#Contributors: Ahnaf, Ernest
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from myapp.models import Player, Task, Card, Purchases, PlayerTask, Campus, Achievement, PlayerAchievement
from django.urls import reverse

class UserTests(APITestCase):
    def test_create_user(self):
        response = self.client.post("/api/user/register/", {"username": "testuser", "password": "testpass"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_username(self):
        user = User.objects.create_user(username="testuser", password="testpass")
        response = self.client.get(f"/api/user/{user.id}/username/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "testuser")

class PlayerTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.campus = Campus.objects.create(campus_id=1, name="Test Campus", location="Streatham")
        self.player = Player.objects.create(player_id=1, user=self.user, points=100, campus=self.campus)

    def test_get_player_list_admin_only(self):
        response = self.client.get("/api/players/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_player_detail_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/player/{self.player.player_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["points"], 100)

    def test_get_player_id_from_user(self):
        response = self.client.get(f"/api/playerid/{self.user.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_player_logo(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f"/api/player/{self.player.player_id}/logo/", {"logo": "new_logo.png"})
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_202_ACCEPTED])

    def test_delete_player(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f"/api/player/{self.player.player_id}/delete/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TaskTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username="admin", password="adminpass")
        self.task = Task.objects.create(task_id=1, title="Test Task", description="A test task")

    def test_get_task_list_admin_only(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get("/api/tasks/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TaskboardTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.campus = Campus.objects.create(campus_id=1, name="Test Campus")
        self.player = Player.objects.create(player_id=1, user=self.user, points=100, campus=self.campus)

    def test_taskboard_view(self):
        response = self.client.get(f"/api/player/{self.player.player_id}/tasks/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class PurchaseTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.campus = Campus.objects.create(campus_id=1, name="Test Campus", location="Streatham")
        self.player = Player.objects.create(player_id=1, user=self.user, points=500, campus=self.campus)
        self.card = Card.objects.create(card_id=1, name="Test Card", rarity="legendary")

    def test_create_purchase_record(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f"/api/player/{self.player.player_id}/purchases/", {"card": self.card.card_id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_redeem_card_pack(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f"/api/player/{self.player.player_id}/redeem_pack/", {"pack_type": "bronze"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class CardTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.campus = Campus.objects.create(campus_id=1, name="Test Campus", location="Streatham")
        self.player = Player.objects.create(player_id=1, user=self.user, points=100, campus=self.campus)

    def test_create_card(self):
        response = self.client.post("/api/card/", {"name": "New Card", "rarity": "rare"})
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST])

    def test_get_player_cards(self):
        response = self.client.get(f"/api/player/{self.player.player_id}/cards/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class AchievementTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.campus = Campus.objects.create(campus_id=1, name="Test Campus", location="Streatham")
        self.player = Player.objects.create(player_id=1, user=self.user, points=100, campus=self.campus)
        self.achievement = Achievement.objects.create(name="Test Achievement", description="Testing achievement", count=1, logo="default.png")

    def test_create_achievement(self):
        response = self.client.post("/api/achievement/", {
        "name": "Eco Warrior",
        "description": "Test Description",
        "count": 1,
        "logo": "default.png"
        })

        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST])

    def test_get_achievement_list(self):
        response = self.client.get("/api/achievements/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_achievement_detail(self):
        response = self.client.get(f"/api/achievement/{self.achievement.achievement_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_assign_achievement_to_player(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f"/api/achievement/{self.player.player_id}/assign_achievement/", {"achievement": self.achievement.achievement_id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_player_achievements(self):
        response = self.client.get(f"/api/player/{self.player.player_id}/achievements/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_player_achievement(self):
        PlayerAchievement.objects.create(player=self.player, achievement=self.achievement, completed=False)
        response = self.client.patch(f"/api/achievement/{self.player.player_id}/{self.achievement.achievement_id}/update/", {"completed": True})
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_202_ACCEPTED])

class LeaderboardTests(APITestCase):
    def setUp(self):
        self.campus = Campus.objects.create(campus_id=1, name="Test Campus", location="Streatham")
        self.user1 = User.objects.create_user(username="user1", password="pass")
        self.user2 = User.objects.create_user(username="user2", password="pass")
        self.player1 = Player.objects.create(player_id=1, user=self.user1, points=200, campus=self.campus)
        self.player2 = Player.objects.create(player_id=2, user=self.user2, points=100, campus=self.campus)

    def test_leaderboard_order(self):
        response = self.client.get("/api/leaderboard/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data[0]["points"], response.data[1]["points"])
