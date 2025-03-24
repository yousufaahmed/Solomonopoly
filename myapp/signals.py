# Contributors: Ernest
import random
from django.db.models.signals import post_save
from django.dispatch import receiver
from myapp.models import Player, Task, PlayerTask, Achievement, PlayerAchievement

@receiver(post_save, sender=Player)
def assign_initial_tasks_and_achievements(sender, instance, created, **kwargs):
    """Assign 3 daily and 3 weekly tasks and grant all achievements (uncompleted) when a new player is created."""
    if created:  # Ensures this only runs when a new Player is created
        # Assign tasks
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

        # Assign all achievements with completed=False
        all_achievements = Achievement.objects.all()
        for achievement in all_achievements:
            PlayerAchievement.objects.create(
                player=instance,
                achievement=achievement,
                completed=False,  # Ensure newly assigned achievements are incomplete
                count=achievement.count
            )
