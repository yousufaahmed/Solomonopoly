from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PlayerTask

@receiver(post_save, sender=PlayerTask)
def update_player_points(sender, instance, **kwargs):
    player = instance.player
    completed_tasks = PlayerTask.objects.filter(player=player, completed=True)
    total_points = 0

    for task in completed_tasks:
        total_points += task.task.points
    
    player.points = total_points
    player.save()

