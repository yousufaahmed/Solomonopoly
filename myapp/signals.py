# Contributors: Ernest
import random
from django.db.models.signals import post_save
from django.dispatch import receiver
from myapp.models import Player, Task, PlayerTask, Achievement, PlayerAchievement

@receiver(post_save, sender=Player)
def assign_initial_tasks_and_achievements(sender, instance, created, **kwargs):
    """
    When a new player is created:
    1. Assign all achievements (uncompleted)
    2. Assign 3 random daily tasks
    3. Assign 3 random weekly tasks
    4. Assign all non-daily and non-weekly tasks
    """
    if created:
        # Assign all achievements and set their tags
        all_achievements = Achievement.objects.all()
        for achievement in all_achievements:
            player_achievement = PlayerAchievement.objects.create(
                player=instance,
                achievement=achievement,
                completed=False,
                count=achievement.count
            )
            player_achievement.tags.set(achievement.tags.all())

        # Get daily and weekly tasks
        daily_tasks = list(Task.objects.filter(tags__name="daily"))
        weekly_tasks = list(Task.objects.filter(tags__name="weekly"))

        # Assign 3 random daily tasks
        if len(daily_tasks) >= 3:
            for task in random.sample(daily_tasks, 3):
                PlayerTask.objects.create(player=instance, task=task, completed=False)

        # Assign 3 random weekly tasks
        if len(weekly_tasks) >= 3:
            for task in random.sample(weekly_tasks, 3):
                PlayerTask.objects.create(player=instance, task=task, completed=False)

        # Assign all non-daily and non-weekly tasks
        non_periodic_tasks = Task.objects.exclude(tags__name__in=["daily", "weekly"])
        for task in non_periodic_tasks:
            PlayerTask.objects.create(player=instance, task=task, completed=False)