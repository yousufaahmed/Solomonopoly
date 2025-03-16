from django.db import models
from django.contrib.auth.models import User
# Create your models here.
# need to integrate inbuilt django user model somehow

class Trivia(models.Model):
    trivia_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)


class Campus(models.Model):
    campus_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)

class Gamekeeper(models.Model):
    gamekeeper_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=200)
    # PROTECT - if a referenced record should not be deleted while it has dependencies
    # SET_NULL - if related records should remain but lose their reference
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE, related_name='gamekeepers')

class Player(models.Model):
    player_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE) # Temporary null value
    username = models.CharField(max_length=100)
    points = models.IntegerField(default=0)
    deck = models.ManyToManyField('Card', blank=True)
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE)

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    task_frame = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    title = models.CharField(max_length=100)
    kind = models.CharField(max_length=50, blank=True)
    points = models.IntegerField(default=0)

class Achievement(models.Model):
    achievement_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    logo = models.CharField(max_length=1000)

class Card(models.Model):
    card_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    rarity = models.CharField(max_length=50)

class Checkpoint(models.Model):
    class CheckpointType(models.TextChoices):
        BUS = "bus", "bus"
        CYCLING = "cycling", "cycling"
        RECYCLE = "recycle", "recycle"

    checkpoint_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    type = models.CharField(
        max_length=10, 
        choices=CheckpointType.choices, 
        default=CheckpointType.BUS  # Set a default to ensure it's mandatory
    )
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE)
    
class GamekeeperTask(models.Model):
    gamekeeper = models.ForeignKey(Gamekeeper, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('gamekeeper', 'task')  # Ensures a Gamekeeper can only be assigned a Task once


class PlayerTask(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    class Meta: # Can be changed so that tasks repeat
        unique_together = ('player', 'task')  # Ensures a Player can only have one record per Task


class Purchases(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    purchase_time = models.DateTimeField(auto_now_add=True)  # Optional: track when purchase happened --- this is necessary for the pk

    class Meta:
        unique_together = ('player', 'card', 'purchase_time')


class Visits(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE)
    visited_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('player', 'checkpoint', 'visited_time')  # Avoid duplicate visits at the same time


class TaskCheckpoint(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('task', 'checkpoint')  # Ensures a Task is assigned to a Checkpoint only once


class PlayerAchievement(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('player', 'achievement')  # Ensures a Player can only have one record per Achivement