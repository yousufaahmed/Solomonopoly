from django.urls import path
from .views import (
    PlayerListView, PlayerView, UpdatePlayerDetailsView, UpdatePlayerTaskView, LeaderboardView,
    TaskListView, TaskView, CreateTaskView, UpdateTaskView, AssignTaskToPlayerView, UsernameView,
    CardListView, CardView, CreatePurchaseRecordView#, UserUpdateView#, PlayerCardListView
)

urlpatterns = [
    path('user/<int:user_id>/username/', UsernameView.as_view(), name='username'),
    #Player Endpoints - Need to fix some stuff first, integrate inbuilt django user model
    path('players/', PlayerListView.as_view(), name='player-list'),
    path('player/<int:player_id>/', PlayerView.as_view(), name='player-detail'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    #path('player/', CreatePlayerView.as_view(), name='player-create'),
    path('player/<int:player_id>/update/', UpdatePlayerDetailsView.as_view(), name='player-update'),
    
    #Task Endpoints
    path('tasks/', TaskListView.as_view(), name = 'task-list'),
    path('task/<int:task_id>/', TaskView.as_view(), name='task-detail'),
    path('task/', CreateTaskView.as_view(), name='task-create'),
    path('task/<int:task_id>/update/', UpdateTaskView.as_view(), name='task-update'),
    path('task/<int:player_id>/assign_task/', AssignTaskToPlayerView.as_view(), name='assign-task'),# --fix player first
    path('task/<int:player_id>/<int:task_id>/update/', UpdatePlayerTaskView.as_view(), name='update-player-task'),

    #Card Endpoints
    path('cards/', CardListView.as_view(), name='card-list'),
    path('card/<int:card_id>/', CardView.as_view(), name='card-detail'),
    path('player/<int:player_id>/purchases/', CreatePurchaseRecordView.as_view(), name='purchase-card' ),
    #path('player/<int:player_id>/deck/', PlayerCardListView.as_view(), name='player-deck'),  -- finish this

    #more to come

]