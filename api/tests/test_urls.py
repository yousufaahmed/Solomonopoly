import pytest
from django.urls import reverse, resolve
from .views import (
    PlayerListView, PlayerView, UpdatePlayerDetailsView, UpdatePlayerTaskView, LeaderboardView,
    TaskListView, TaskView, CreateTaskView, UpdateTaskView, AssignTaskToPlayerView,
    CardListView, CardView, CreatePurchaseRecordView
)

# Player URL Tests
def test_player_list_url():
    """Test player list URL resolves correctly"""
    url = reverse('player-list')
    assert url == '/players/'
    resolver = resolve(url)
    assert resolver.func.view_class == PlayerListView

def test_player_detail_url():
    """Test player detail URL resolves correctly"""
    url = reverse('player-detail', kwargs={'player_id': 1})
    assert url == '/player/1/'
    resolver = resolve(url)
    assert resolver.func.view_class == PlayerView

def test_leaderboard_url():
    """Test leaderboard URL resolves correctly"""
    url = reverse('leaderboard')
    assert url == '/leaderboard/'
    resolver = resolve(url)
    assert resolver.func.view_class == LeaderboardView

def test_player_update_url():
    """Test player update URL resolves correctly"""
    url = reverse('player-update', kwargs={'player_id': 1})
    assert url == '/player/1/update/'
    resolver = resolve(url)
    assert resolver.func.view_class == UpdatePlayerDetailsView

# Task URL Tests
def test_task_list_url():
    """Test task list URL resolves correctly"""
    url = reverse('task-list')
    assert url == '/tasks/'
    resolver = resolve(url)
    assert resolver.func.view_class == TaskListView

def test_task_detail_url():
    """Test task detail URL resolves correctly"""
    url = reverse('task-detail', kwargs={'task_id': 1})
    assert url == '/task/1/'
    resolver = resolve(url)
    assert resolver.func.view_class == TaskView

def test_task_create_url():
    """Test task create URL resolves correctly"""
    url = reverse('task-create')
    assert url == '/task/'
    resolver = resolve(url)
    assert resolver.func.view_class == CreateTaskView

def test_task_update_url():
    """Test task update URL resolves correctly"""
    url = reverse('task-update', kwargs={'task_id': 1})
    assert url == '/task/1/update/'
    resolver = resolve(url)
    assert resolver.func.view_class == UpdateTaskView

def test_assign_task_url():
    """Test assign task URL resolves correctly"""
    url = reverse('assign-task', kwargs={'player_id': 1})
    assert url == '/task/1/assign_task/'
    resolver = resolve(url)
    assert resolver.func.view_class == AssignTaskToPlayerView

def test_update_player_task_url():
    """Test update player task URL resolves correctly"""
    url = reverse('update-player-task', kwargs={'player_id': 1, 'task_id': 2})
    assert url == '/task/1/2/update/'
    resolver = resolve(url)
    assert resolver.func.view_class == UpdatePlayerTaskView

# Card URL Tests
def test_card_list_url():
    """Test card list URL resolves correctly"""
    url = reverse('card-list')
    assert url == '/cards/'
    resolver = resolve(url)
    assert resolver.func.view_class == CardListView

def test_card_detail_url():
    """Test card detail URL resolves correctly"""
    url = reverse('card-detail', kwargs={'card_id': 1})
    assert url == '/card/1/'
    resolver = resolve(url)
    assert resolver.func.view_class == CardView

def test_purchase_card_url():
    """Test purchase card URL resolves correctly"""
    url = reverse('purchase-card', kwargs={'player_id': 1})
    assert url == '/player/1/purchases/'
    resolver = resolve(url)
    assert resolver.func.view_class == CreatePurchaseRecordView