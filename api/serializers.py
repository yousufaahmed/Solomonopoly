#Eliot's stuff >:(

from django.contrib.auth.models import User
from myapp.models import Player, Trivia, Campus, Gamekeeper, Task, Card, Checkpoint, GamekeeperTask, PlayerTask, Purchases, Visits, TaskCheckpoint
from rest_framework import serializers

### This serializer/model might need to be changed ###

# class PlayerSerializer(serializers.ModelSerializer):
#     Campus = 
#     class Meta:
#         model = Player
#         fields = ["player_id", "user", "points", "deck", "campus"]

class TriviaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trivia
        fields = ["trivia_id", "name", "description"]

class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = ["campus_id", "name", "location"]

### This serializer/model might need to be changed ###

# class GamekeeperSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Gamekeeper
#         fields = ["gamekeeper_id", "name", "password", "campus"]
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trivia
        fields = ["trivia_id", "name", "description"]
        
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["card_id", "name", "description", "rarity"]
        
class CheckpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkpoint
        fields = ["checkpoint_id", "name", "location", "type", "campus"]

### These serializers/models might need to be changed ###

# class GamekeeperTaskSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GamekeeperTask
#         fields = ["gamekeeper", "task"]

# class PlayerTaskSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PlayerTask
#         fields = ["player", "task", "completed"]
#         extra_kwargs = {'completed':{'read_only':True}}

#     def create(self, validated_data):
#         player = validated_data['player']
#         task = validated_data['task']

#         if PlayerTask.objects.filter(player=player, task=task).exists():
#             raise serializers.ValidationError("The task has already been assigned to the player.")

#         return PlayerTask.objects.create(**validated_data)
        

#change this class to allow for multiple purchases of the same card, purchase_time needs to be included on the pk        
class PurchasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchases
        fields = ["player", "card", "purchase_time"]
        extra_kwargs = {'purchase_time': {'read_only': True}} #should be automatically set on creation

    def create(self, validated_data):
        player = validated_data['player']
        card = validated_data['card']

        if Purchases.objects.filter(player=player,card=card).exists():
            raise serializers.ValidationError("This card has already been purchased by the player.")
        
        return Purchases.objects.create(**validated_data)
    

class VisitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visits
        fields = ["player", "checkpoint", "visited_time"]
        
class TaskCheckpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCheckpoint
        fields = ["task", "checkpoint"]
        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]#, "player"] --fix player and integrate User first
        extra_kwargs = {"password": {"write_only": True}} #no one can read password

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)

        return user
        
        
