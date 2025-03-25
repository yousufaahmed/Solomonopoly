#Contributors: Ahnaf, Ernest
from django.test import TestCase
from django.urls import reverse, resolve
from api.views import (
    PlayerListView, PlayerView, UpdatePlayerDetailsView, UpdatePlayerTaskView, LeaderboardView,
    TaskListView, TaskView, CreateTaskView, UpdateTaskView, AssignTaskToPlayerView,
    CardListView, CardView, CreatePurchaseRecordView, UsernameView, PlayerIdView,
    UpdatePlayerLogoView, CreateCardView, PlayerCardView, CreateAchievementView,
    AchievementListView, AchievementView, UpdateAchievementView,
    AssignAchievementToPlayerView, UpdatePlayerAchievementView, PlayerAchievementView,
    RedeemCardPackView
)
from api.views import delete_player

class URLTests(TestCase):

    # Player URL Tests
    def test_player_list_url(self):
        """Test player list URL resolves correctly"""
        url = reverse('player-list')
        self.assertEqual(url, '/api/players/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, PlayerListView)

    def test_player_detail_url(self):
        """Test player detail URL resolves correctly"""
        url = reverse('player-detail', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/player/1/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, PlayerView)

    def test_leaderboard_url(self):
        """Test leaderboard URL resolves correctly"""
        url = reverse('leaderboard')
        self.assertEqual(url, '/api/leaderboard/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, LeaderboardView)

    def test_player_update_url(self):
        """Test player update URL resolves correctly"""
        url = reverse('player-update', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/player/1/update/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, UpdatePlayerDetailsView)
        
    def test_username_url(self):
        url = reverse('username', kwargs={'user_id': 1})
        self.assertEqual(url, '/api/user/1/username/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, UsernameView)

    def test_player_id_url(self):
        url = reverse('player-id', kwargs={'user': 1})
        self.assertEqual(url, '/api/playerid/1/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, PlayerIdView)

    def test_update_player_logo_url(self):
        url = reverse('update_player_logo', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/player/1/logo/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, UpdatePlayerLogoView)

    def test_delete_player_url(self):
        url = reverse('delete_player', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/player/1/delete/')
        resolver = resolve(url)
        self.assertEqual(resolver.func, delete_player)

    def test_redeem_pack_url(self):
        url = reverse('redeem-pack', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/player/1/redeem_pack/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, RedeemCardPackView)

    # Task URL Tests
    def test_task_list_url(self):
        """Test task list URL resolves correctly"""
        url = reverse('task-list')
        self.assertEqual(url, '/api/tasks/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, TaskListView)

    def test_task_detail_url(self):
        """Test task detail URL resolves correctly"""
        url = reverse('task-detail', kwargs={'task_id': 1})
        self.assertEqual(url, '/api/task/1/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, TaskView)

    def test_task_create_url(self):
        """Test task create URL resolves correctly"""
        url = reverse('task-create')
        self.assertEqual(url, '/api/task/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, CreateTaskView)

    def test_task_update_url(self):
        """Test task update URL resolves correctly"""
        url = reverse('task-update', kwargs={'task_id': 1})
        self.assertEqual(url, '/api/task/1/update/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, UpdateTaskView)

    def test_assign_task_url(self):
        """Test assign task URL resolves correctly"""
        url = reverse('assign-task', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/task/1/assign_task/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, AssignTaskToPlayerView)

    def test_update_player_task_url(self):
        """Test update player task URL resolves correctly"""
        url = reverse('update-player-task', kwargs={'player_id': 1, 'task_id': 2})
        self.assertEqual(url, '/api/task/1/2/update/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, UpdatePlayerTaskView)

    # Card URL Tests
    def test_card_list_url(self):
        """Test card list URL resolves correctly"""
        url = reverse('card-list')
        self.assertEqual(url, '/api/cards/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, CardListView)

    def test_card_detail_url(self):
        """Test card detail URL resolves correctly"""
        url = reverse('card-detail', kwargs={'card_id': 1})
        self.assertEqual(url, '/api/card/1/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, CardView)

    def test_purchase_card_url(self):
        """Test purchase card URL resolves correctly"""
        url = reverse('purchase-card', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/player/1/purchases/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, CreatePurchaseRecordView)

    def test_card_create_url(self):
        url = reverse('card-create')
        self.assertEqual(url, '/api/card/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, CreateCardView)

    # Achievement URL Tests
    def test_create_achievement_url(self):
        url = reverse('achievement-list-create')
        self.assertEqual(url, '/api/achievement/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, CreateAchievementView)

    def test_achievement_list_url(self):
        url = reverse('achievement-list')
        self.assertEqual(url, '/api/achievements/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, AchievementListView)

    def test_achievement_detail_url(self):
        url = reverse('achievement-detail', kwargs={'achievement_id': 1})
        self.assertEqual(url, '/api/achievement/1/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, AchievementView)

    def test_update_achievement_url(self):
        url = reverse('achievement-update', kwargs={'achievement_id': 1})
        self.assertEqual(url, '/api/achievement/1/update/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, UpdateAchievementView)

    def test_assign_achievement_url(self):
        url = reverse('assign-achievement', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/achievement/1/assign_achievement/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, AssignAchievementToPlayerView)

    def test_update_player_achievement_url(self):
        url = reverse('update-player-achievement', kwargs={'player_id': 1, 'achievement_id': 2})
        self.assertEqual(url, '/api/achievement/1/2/update/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, UpdatePlayerAchievementView)

    def test_player_achievements_url(self):
        url = reverse('get-player-achievements', kwargs={'player_id': 1})
        self.assertEqual(url, '/api/player/1/achievements/')
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, PlayerAchievementView)