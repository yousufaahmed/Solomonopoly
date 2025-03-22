#Eliot's stuff >:(

from django.contrib.auth.models import User
from myapp.models import Player, Trivia, Campus, Gamekeeper, Task, Card, Checkpoint, GamekeeperTask, PlayerTask, Purchases, Visits, TaskCheckpoint, Tag
from rest_framework import serializers


### This serializer/model might need to be changed ###

class PlayerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Player
        fields = ["player_id", "user","username", "points", "deck", "campus"]

class PlayerIdOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['player_id']

class LeaderboardSerializer(serializers.ModelSerializer):
    rank = serializers.SerializerMethodField()
    username = serializers.CharField(source='user.username')

    class Meta:
        model = Player
        fields = ["rank", "username", "points"]

    def get_rank(self, obj):
        queryset = Player.objects.all().order_by("-points")
        #get list of players ordered by points, return index + 1 of current player
        return list(queryset).index(obj)+1 

class TaskBoardSerializer(serializers.ModelSerializer):
    task_id = serializers.IntegerField(source="task.task_id", read_only=True)
    title = serializers.CharField(source="task.title", read_only=True)
    description = serializers.CharField(source="task.description", read_only=True)
    #kind = serializers.CharField(source="task.kind", read_only=True)
    points = serializers.IntegerField(source="task.points", read_only=True)
    player = serializers.CharField(source="player.username", read_only=True)  # Include player username
    completed = serializers.BooleanField(read_only=True)
    tags = serializers.SlugRelatedField(source="task.tags", many=True, read_only=True, slug_field="name")
    count = serializers.IntegerField(source="task.count", read_only=True)
    
    class Meta:
        model = PlayerTask
        fields = ["player", "task_id", "title", "description", "tags", "points", "completed"]

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
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tag
        fields = ["name"]

class TaskSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True, queryset=Tag.objects.all(), slug_field="name"
    )

    class Meta:
        model = Task
        fields = ["task_id", "task_frame", "description", "title", "tags", "points", "count"]
    
    def update(self, instance, validated_data):
        tags_data = validated_data.pop("tags",[])
        instance = super().update(instance, validated_data) 
        instance.tags.set(tags_data)
        return instance

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["card_id", "name", "description", "rarity"]
        
class CheckpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkpoint
        fields = ["checkpoint_id", "name", "location", "type", "campus"]

### These serializers/models might need to be changed ###

class GamekeeperTaskSerializer(serializers.ModelSerializer):
    task = TaskSerializer(read_only=True)

    class Meta:
        model = GamekeeperTask
        fields = ["gamekeeper", "task"]

class PlayerTaskSerializer(serializers.ModelSerializer):
    #task_name = serializers.CharField(source ='task.title', read_only = True)
    #player_name = serializers.CharField(source='player.username', read_only=True)

    class Meta:
        model = PlayerTask
        fields = ["player", "task", "completed"]
        #extra_kwargs = {'player':{'read_only':True}, 'task':{'read_only':True}}

    def create(self, validated_data):
        player = validated_data['player']
        task = validated_data['task']

        if PlayerTask.objects.filter(player=player, task=task).exists():
            raise serializers.ValidationError("The task has already been assigned to the player.")

        return PlayerTask.objects.create(**validated_data)
    
class PlayerTaskSerializerUpdate(serializers.ModelSerializer):
    #task_name = serializers.CharField(source ='task.title', read_only = True)
    #player_name = serializers.CharField(source='player.username', read_only=True)

    class Meta:
        model = PlayerTask
        fields = ["player", "task", "completed"]
        extra_kwargs = {'player':{'read_only':True}, 'task':{'read_only':True}}

    def create(self, validated_data):
        player = validated_data['player']
        task = validated_data['task']

        if PlayerTask.objects.filter(player=player, task=task).exists():
            raise serializers.ValidationError("The task has already been assigned to the player.")

        return PlayerTask.objects.create(**validated_data)
        

#change this class to allow for multiple purchases of the same card, purchase_time needs to be included on the pk        
class PurchasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchases
        fields = ["player", "card", "purchase_time"]
        extra_kwargs = {'purchase_time': {'read_only': True}} #should be automatically set on creation

    def create(self, validated_data):
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
        fields = ["id", "username", "password"]#, "player"]# --fix player and integrate User first
        extra_kwargs = {"password": {"write_only": True}} #no one can read password

    def create(self, validated_data):
        #print(validated_data)
        user = User.objects.create_user(**validated_data)
        default_campus, _ = Campus.objects.get_or_create(name='Streatham Campus')

        Player.objects.create(user=user, points=0, campus = default_campus )
        
        return user
        
        
