from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, TaskSerializer, CardSerializer, PurchasesSerializer, PlayerSerializer, PlayerTaskSerializer
from myapp.models import Player, Task, Card, Purchases
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes =  [AllowAny]

# Create your views here.

###  Player views - Need to change models & serializers first ###

class PlayerListView(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [AllowAny]#IsAdminUser]


class PlayerView(generics.RetrieveAPIView):
    queryset=Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [AllowAny]#IsAuthenticated]

    lookup_field = 'player_id'

# class CreatePlayerView(generics.CreateAPIView):
#     queryset=Player.objects.all()
#     serializer_class = PlayerSerializer
#     permission_classes = [AllowAny]

class UpdatePlayerDetailsView(generics.UpdateAPIView):
    queryset=Player.objects.all()
    serializer_class=PlayerSerializer
    permission_classes=[AllowAny]#IsAuthenticated]

    lookup_field = 'player_id'


### Task Views ###

class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminUser]

class TaskView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes = [IsAuthenticated]

class CreateTaskView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]#IsAdminUser]

class UpdateTaskView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminUser]

### Need to fix player first ###

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

# class PlayerTaskView(generics.ListAPIView):
#     serializer_class = PlayerTaskSerializer

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
