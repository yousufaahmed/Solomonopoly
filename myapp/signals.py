# Contributors: Ernest
import random
from django.db.models.signals import post_save
from django.dispatch import receiver
from myapp.models import Player, Task, PlayerTask

@receiver(post_save, sender=Player)
def assign_initial_tasks(sender, instance, created, **kwargs):
    """Assign 3 daily and 3 weekly tasks when a new player is created."""
    if created:  # Ensures this only runs when a new Player is created
        daily_tasks = list(Task.objects.filter(tags__name="daily"))
        weekly_tasks = list(Task.objects.filter(tags__name="weekly"))

        if len(daily_tasks) >= 3:
            selected_daily_tasks = random.sample(daily_tasks, 3)
            for task in selected_daily_tasks:
                PlayerTask.objects.create(player=instance, task=task, completed=False)

        if len(weekly_tasks) >= 3:
            selected_weekly_tasks = random.sample(weekly_tasks, 3)
            for task in selected_weekly_tasks:
                PlayerTask.objects.create(player=instance, task=task, completed=False)
