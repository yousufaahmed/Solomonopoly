from django.db import models

# Create your models here.

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
    location = models.CharField(max_length=200)
    # PROTECT - if a referenced record should not be deleted while it has dependencies
    # SET_NULL - if related records should remain but lose their reference
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE, related_name='gamekeepers')

class Player(models.Model):
    player_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    points = models.IntegerField(default=0)
    deck = models.CharField(max_length=200, blank=True)
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE)

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    task_frame = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    title = models.CharField(max_length=100)
    kind = models.CharField(max_length=50, blank=True)
    points = models.IntegerField(default=0)

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

    check_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    type = models.CharField(
        max_length=10, 
        choices=CheckpointType.choices, 
        default=CheckpointType.BUS  # Set a default to ensure it's mandatory
    )
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE)