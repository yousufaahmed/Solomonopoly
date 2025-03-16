from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, TaskSerializer, CardSerializer, PurchasesSerializer, PlayerSerializer,PlayerIdOnlySerializer, PlayerTaskSerializer, LeaderboardSerializer, PlayerTaskSerializerUpdate, TaskBoardSerializer
from myapp.models import Player, Task, Card, Purchases, PlayerTask
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

        tasks = PlayerTask.objects.filter(player=player).select_related("task")

        #valid_kinds = ['daily', 'weekly', 'location', 'group']

        return tasks.order_by(Case(
            When(task__kind='daily', then=1),
            When(task__kind='weekly', then=2),
            When(task__kind='location', then=3),
            When(task__kind='group', then=4),
            default=5,
            output_field=IntegerField()
        ))
    

# Return a list of all the tasks
class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]

# Return the details of an individual task
class TaskView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes = [AllowAny]
    lookup_field = 'task_id'

# Create a new task
class CreateTaskView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]

# Change task details
class UpdateTaskView(generics.UpdateAPIView):
    queryset = Task.objects.all()
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


### Misc Views ###

#class LeaderboardView():
