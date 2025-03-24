# Contributors: Ernest
import random
from django.db.models.signals import post_save
from django.dispatch import receiver
from myapp.models import Player, Task, PlayerTask, Achievement, PlayerAchievement

@receiver(post_save, sender=Player)
def assign_initial_tasks_and_achievements(sender, instance, created, **kwargs):
    """Assign 3 daily and 3 weekly tasks and grant all achievements (uncompleted) when a new player is created."""
    if created:
        daily_tasks = list(Task.objects.filter(tags__name="daily"))
        weekly_tasks = list(Task.objects.filter(tags__name="weekly"))

        if len(daily_tasks) >= 3:
            for task in random.sample(daily_tasks, 3):
                PlayerTask.objects.create(player=instance, task=task, completed=False)

        if len(weekly_tasks) >= 3:
            for task in random.sample(weekly_tasks, 3):
                PlayerTask.objects.create(player=instance, task=task, completed=False)

        # Assign all achievements and set their tags
        all_achievements = Achievement.objects.all()
        for achievement in all_achievements:
            player_achievement = PlayerAchievement.objects.create(
                player=instance,
                achievement=achievement,
                completed=False,
                count=achievement.count
            )
            player_achievement.tags.set(achievement.tags.all())  # ✅ THIS is the missing link

