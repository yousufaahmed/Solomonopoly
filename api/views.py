import random
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, TaskSerializer, CardSerializer, PurchasesSerializer, PlayerSerializer,PlayerIdOnlySerializer, PlayerTaskSerializer, LeaderboardSerializer, PlayerTaskSerializerUpdate, PlayerAchievementSerializerUpdate, TaskBoardSerializer, AchievementSerializer, PlayerAchievementSerializer
from myapp.models import Player, Task, Card, Purchases, PlayerTask, Achievement, PlayerAchievement, GamekeeperTask, TaskCheckpoint
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.db.models import Case, When, Value, IntegerField

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes =  [AllowAny]

class UsernameView(APIView):
    # queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    
    def get(self, request, user_id):
        # Retrieve the user by ID, or return 404 if not found
        user = get_object_or_404(User, pk=user_id)
        return Response(
            {"username": user.username},
            status=status.HTTP_200_OK
        )
    

class PlayerIdView(generics.RetrieveAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerIdOnlySerializer
    permission_classes = [AllowAny]
    lookup_field = 'user'

# Create your views here.

###  Player views - Need to change models & serializers first ###

# Lists all the players
class PlayerListView(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [AllowAny]

# Gets the and individual players' details
class PlayerView(generics.RetrieveAPIView):
    queryset=Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [AllowAny]

    lookup_field = 'player_id'


# class CreatePlayerView(generics.CreateAPIView):
#     queryset=Player.objects.all()
#     serializer_class = PlayerSerializer
#     permission_classes = [AllowAny]


# Update the individual players' details
class UpdatePlayerDetailsView(generics.UpdateAPIView):
    queryset=Player.objects.all()
    serializer_class=PlayerSerializer
    permission_classes=[IsAuthenticated]

    lookup_field = 'player_id'

class LeaderboardView(generics.ListAPIView):
    queryset = Player.objects.all().order_by('-points')
    serializer_class = LeaderboardSerializer
    permission_classes = [AllowAny]


### Task Views ###

class TaskboardView(generics.ListAPIView):
    serializer_class = TaskBoardSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        player_id = self.kwargs["player_id"]
        player = get_object_or_404(Player, pk=player_id)

        tasks = PlayerTask.objects.filter(player=player).select_related("task").prefetch_related("task__tags")

        tag_priority = {
            "daily":1,
            "weekly": 2,
            "location": 3,
            "group": 4,
            "campus":5,
            "recycling":6,
            "water":7,
            "electric":8,
            "bus":9,
            "cycle":10,
            "walk":11
        }

        def sort_tags_by_priority(task):
            task_tags = list(task.task.tags.values_list("name", flat=True))
            priority = min((tag_priority.get(tag, 5) for tag in task_tags), default=5)  # Get lowest priority tag
            return priority
        
        sorted_tasks = sorted(tasks, key=sort_tags_by_priority)

        return sorted_tasks
        # #valid_kinds = ['daily', 'weekly', 'location', 'group']

        # return tasks.order_by(Case(
        #     When(task__kind='daily', then=1),
        #     When(task__kind='weekly', then=2),
        #     When(task__kind='location', then=3),
        #     When(task__kind='group', then=4),
        #     default=5,
        #     output_field=IntegerField()
        # ))
    

# Return a list of all the tasks
class TaskListView(generics.ListAPIView):
    queryset = Task.objects.prefetch_related("tags").all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]

# Return the details of an individual task
class TaskView(generics.RetrieveAPIView):
    queryset = Task.objects.prefetch_related("tags").all()
    serializer_class=TaskSerializer
    permission_classes = [AllowAny]
    lookup_field = 'task_id'

# Create a new task
class CreateTaskView(generics.CreateAPIView):
    queryset = Task.objects.prefetch_related("tags").all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]

# Change task details
class UpdateTaskView(generics.UpdateAPIView):
    queryset = Task.objects.prefetch_related("tags").all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminUser]

### Need to fix player first ###

# Assign a task to a player
class AssignTaskToPlayerView(generics.CreateAPIView):
    serializer_class =  PlayerTaskSerializer

    def create(self, request, player_id, *args, **kwargs):
        player = get_object_or_404(Player, pk=player_id)
        task_id =request.data.get('task')

        if not task_id:
            return Response({"error":"Task ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        task = get_object_or_404(Task, pk=task_id)

        player_task_data = {'player': player.player_id, 'task': task.task_id, 'completed': False }
        serializer =  self.get_serializer(data=player_task_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePlayerTaskView(generics.UpdateAPIView):
    #queryset = PlayerTask.objects.all()
    serializer_class = PlayerTaskSerializerUpdate
    permission_classes = [AllowAny]#IsAuthenticated]

    def get_object(self):
        player_id = self.kwargs["player_id"]
        task_id = self.kwargs["task_id"]
        return get_object_or_404(PlayerTask, player_id=player_id, task_id=task_id)
#    lookup_field = 'id'
# 
# class TaskboardView(generics.ListAPIView):
#     serializer_class = PlayerTaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return PlayerTask.objects.filter(player=self.request.user.player).select_related("task")
    
#     def list(self, request, *args, **kwargs):
#         player_tasks = self.get_queryset()
#         task_data = self.get_serializer(player_tasks, many=True).data

#         grouped_tasks = defaultdict(list)
#         for task in task_data:
#             kind = task["task"]["kind"]
#             grouped_tasks[kind].append(task)

#         return Response(grouped_tasks)
    

class PlayerTaskView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]  # Update with appropriate permission if necessary

    def get_queryset(self):
        player_id = self.kwargs["player_id"]
        player = get_object_or_404(Player, pk=player_id)
        return Task.objects.filter(player=player).order_by("task__kind")

    def get(self, request, player_id, *args, **kwargs):
        player_tasks = self.get_queryset()
        serializer = self.get_serializer(player_tasks, many=True)

  
        return Response(serializer.data)

### Card/Purchase Views ###

class CardListView(generics.ListAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [IsAdminUser]

class CardView(generics.RetrieveAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]

class CreatePurchaseRecordView(generics.CreateAPIView):
    serializer_class = PurchasesSerializer

    def create(self, request, player_id, *args, **kwargs):
        player = get_object_or_404(Player, pk=player_id)
        card_id = request.data.get('card')

        if not card_id:
            return Response({"error": "Card ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        card = get_object_or_404(Card,pk = card_id)

        purchase_data = {'player': player.player_id, 'card':card.card_id}
        serializer = self.get_serializer(data=purchase_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class PlayerCardListView():

#     serializer_class =  PurchasesSerializer

class PurchaseListView(generics.ListAPIView):
    queryset = Purchases.objects.all()
    serializer_class = PurchasesSerializer
    permission_classes = [IsAuthenticated]

class PurchaseView(generics.RetrieveAPIView):
    queryset = Purchases.objects.all()
    serializer_class = PurchasesSerializer
    permission_classes = [IsAuthenticated]

class PlayerPurchasesView(generics.CreateAPIView):
    queryset = Purchases.objects.all()
    serializer_class = PurchasesSerializer

    def create(self, request, *args, **kwargs):
        player_id = kwargs.get("player_id")
        player = get_object_or_404(Player, pk=player_id)

        card_id = request.data.get("card")
        if not card_id:
            return Response({"error": "Card ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        card = get_object_or_404(Card, pk=card_id)


        serializer = self.get_serializer(data={"player": player.player_id, "card": card_id})
        if serializer.is_valid():
            serializer.save(player = player, card = card)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CreateAchievementView(generics.CreateAPIView):
    queryset = Achievement.objects.all()
    serializer_class =  AchievementSerializer
    permission_classes = [AllowAny]

 # Return a list of all the tasks
class AchievementListView(generics.ListAPIView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [AllowAny]

# Return the details of an individual task
class AchievementView(generics.RetrieveAPIView):
    queryset = Achievement.objects.all()
    serializer_class=AchievementSerializer
    permission_classes = [AllowAny]
    lookup_field = 'achievement_id'   

# Assign a task to a player
class AssignAchievementToPlayerView(generics.CreateAPIView):
    serializer_class =  PlayerAchievementSerializer

    def create(self, request, player_id, *args, **kwargs):
        player = get_object_or_404(Player, pk=player_id)
        achievement_id =request.data.get('achievement')

        if not achievement_id:
            return Response({"error":"Achievement ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        achievement = get_object_or_404(Achievement, pk=achievement_id)

        player_achievement_data = {'player': player.player_id, 'achievement': achievement.achievement_id, 'completed': False }
        serializer =  self.get_serializer(data=player_achievement_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlayerAchievementView(generics.ListAPIView):
    serializer_class = PlayerAchievementSerializer
    permission_classes = [AllowAny]  # Update with appropriate permission if necessary

    def get_queryset(self):
        player_id = self.kwargs["player_id"]
        player = get_object_or_404(Player, pk=player_id)
        return PlayerAchievement.objects.filter(player=player)

    def get(self, request, player_id, *args, **kwargs):
        player_achievements = self.get_queryset()
        serializer = self.get_serializer(player_achievements, many=True)

  
        return Response(serializer.data)
    
class UpdateAchievementView(generics.UpdateAPIView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [IsAdminUser]


class UpdatePlayerAchievementView(generics.UpdateAPIView):
    #queryset = PlayerTask.objects.all()
    serializer_class = PlayerAchievementSerializerUpdate
    permission_classes = [AllowAny]#IsAuthenticated]

    def get_object(self):
        player_id = self.kwargs["player_id"]
        achievement_id = self.kwargs["achievement_id"]
        return get_object_or_404(PlayerAchievement, player_id=player_id, achievement_id=achievement_id)
 

### Misc Views ###

#class LeaderboardView():

class RedeemCardPackView(generics.CreateAPIView):
    serializer_class = PurchasesSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        player_id = kwargs.get("player_id")
        player = get_object_or_404(Player, pk=player_id)

        all_cards = list(Card.objects.all())
        if len(all_cards) < 3:
            return Response({"error": "Not enough cards in the database to redeem a pack."}, status=status.HTTP_400_BAD_REQUEST)

        awarded_cards = random.sample(all_cards, k=3)
        purchases = []
        for card in awarded_cards:
            purchase = Purchases.objects.create(player=player, card=card)
            purchases.append(PurchasesSerializer(purchase).data)

        return Response({"cards_awarded": purchases}, status=status.HTTP_201_CREATED)
    
    


# class PlayerDeleteView(APIView):
#     """
#     Delete a player and all related records.
    
#     This will cascade delete:
#     - Player object
#     - User object (via cascade)
#     - PlayerTask instances
#     - PlayerAchievement instances
#     - Purchases instances
#     - Visits instances
#     """
#     permission_classes = [IsAuthenticated, IsAdminUser]
    
#     def delete(self, request, player_id):
#         player = get_object_or_404(Player, player_id=player_id)
        
#         # Deletion of User will cascade to Player and all related models with ForeignKey to Player
#         user = player.user
#         user.delete()
        
#         return Response({"detail": f"Player {player_id} and all related data successfully deleted."}, 
#                         status=status.HTTP_204_NO_CONTENT)


# class TaskDeleteView(APIView):
#     """
#     Delete a task and all related records.
    
#     This will delete:
#     - Task object
#     - PlayerTask instances
#     - GamekeeperTask instances
#     - TaskCheckpoint instances
#     """
#     permission_classes = [IsAuthenticated, IsAdminUser]
    
#     def delete(self, request, task_id):
#         task = get_object_or_404(Task, task_id=task_id)
        
#         # Manually delete related records in junction tables
#         PlayerTask.objects.filter(task=task).delete()
#         GamekeeperTask.objects.filter(task=task).delete()
#         TaskCheckpoint.objects.filter(task=task).delete()
        
#         # Delete the task itself
#         task.delete()
        
#         return Response({"detail": f"Task {task_id} and all related data successfully deleted."},
#                         status=status.HTTP_204_NO_CONTENT)


# class CardDeleteView(APIView):
#     """
#     Delete a card and all related records.
    
#     This will delete:
#     - Card object
#     - Purchases instances
#     - Remove card from Player.deck (many-to-many relationship)
#     """
#     permission_classes = [IsAuthenticated, IsAdminUser]
    
#     def delete(self, request, card_id):
#         card = get_object_or_404(Card, card_id=card_id)
        
#         # Delete purchases of this card
#         Purchases.objects.filter(card=card).delete()
        
#         # Remove card from all player decks (many-to-many)
#         for player in Player.objects.filter(deck=card):
#             player.deck.remove(card)
        
#         # Delete the card itself
#         card.delete()
        
#         return Response({"detail": f"Card {card_id} and all related data successfully deleted."},
#                         status=status.HTTP_204_NO_CONTENT)


# class PurchaseDeleteView(APIView):
#     """
#     Delete a specific purchase by player and card.
#     """
#     permission_classes = [IsAuthenticated]
    
#     def delete(self, request, player_id, card_id, purchase_time=None):
#         # Get player and card
#         player = get_object_or_404(Player, player_id=player_id)
#         card = get_object_or_404(Card, card_id=card_id)
        
#         # Filter purchases
#         purchases_query = Purchases.objects.filter(player=player, card=card)
        
#         # If purchase_time is provided, filter by that as well
#         if purchase_time:
#             purchases_query = purchases_query.filter(purchase_time=purchase_time)
        
#         # If no purchases match the criteria
#         if not purchases_query.exists():
#             return Response({"detail": "No matching purchase found."},
#                             status=status.HTTP_404_NOT_FOUND)
        
#         # Delete the purchases
#         count = purchases_query.count()
#         purchases_query.delete()
        
#         # Remove card from player's deck if they no longer own any copies
#         if not Purchases.objects.filter(player=player, card=card).exists():
#             if card in player.deck.all():
#                 player.deck.remove(card)
        
#         return Response({"detail": f"Deleted {count} purchase(s)."},
#                         status=status.HTTP_204_NO_CONTENT)


# class BulkDeleteView(APIView):
#     """
#     Bulk delete multiple instances of any supported model type.
    
#     Request format:
#     {
#         "players": [1, 2, 3],
#         "tasks": [4, 5, 6],
#         "cards": [7, 8, 9],
#         "purchases": [{"player": 1, "card": 2, "purchase_time": "2023-01-01T12:00:00Z"}]
#     }
#     """
#     permission_classes = [IsAuthenticated, IsAdminUser]
    
#     def post(self, request):
#         data = request.data
#         deletion_counts = {}
        
#         # Delete players
#         if "players" in data:
#             player_ids = data["players"]
#             users_to_delete = User.objects.filter(player__player_id__in=player_ids)
#             count = users_to_delete.count()
#             users_to_delete.delete()
#             deletion_counts["players"] = count
        
#         # Delete tasks
#         if "tasks" in data:
#             task_ids = data["tasks"]
#             # Delete related junction table records first
#             PlayerTask.objects.filter(task__task_id__in=task_ids).delete()
#             GamekeeperTask.objects.filter(task__task_id__in=task_ids).delete()
#             TaskCheckpoint.objects.filter(task__task_id__in=task_ids).delete()
#             # Delete tasks
#             count = Task.objects.filter(task_id__in=task_ids).delete()[0]
#             deletion_counts["tasks"] = count
        
#         # Delete cards
#         if "cards" in data:
#             card_ids = data["cards"]
#             cards = Card.objects.filter(card_id__in=card_ids)
            
#             # Delete purchases for these cards
#             Purchases.objects.filter(card__in=cards).delete()
            
#             # Remove cards from player decks
#             for card in cards:
#                 for player in Player.objects.filter(deck=card):
#                     player.deck.remove(card)
            
#             # Delete the cards
#             count = cards.delete()[0]
#             deletion_counts["cards"] = count
        
#         # Delete purchases
#         if "purchases" in data:
#             purchase_count = 0
#             for purchase_data in data["purchases"]:
#                 player_id = purchase_data.get("player")
#                 card_id = purchase_data.get("card")
#                 purchase_time = purchase_data.get("purchase_time")
                
#                 purchases_query = Purchases.objects.filter(
#                     player__player_id=player_id,
#                     card__card_id=card_id
#                 )
                
#                 if purchase_time:
#                     purchases_query = purchases_query.filter(purchase_time=purchase_time)
                
#                 # Update the count
#                 purchase_count += purchases_query.count()
#                 purchases_query.delete()
            
#             deletion_counts["purchases"] = purchase_count
         
#         return Response({"detail": "Bulk deletion completed", "counts": deletion_counts},
#                         status=status.HTTP_200_OK)


