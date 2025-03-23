import random
from django.core.management.base import BaseCommand
from myapp.models import Player, Task, PlayerTask

class Command(BaseCommand):
    help = 'Assign 3 random daily tasks to each player, removing previous daily tasks'

    def handle(self, *args, **kwargs):
        # Get all players
        players = Player.objects.all()

        # Get all tasks with the 'daily' tag
        daily_tasks = Task.objects.filter(tags__name="daily")

        for player in players:
            # Remove previous daily tasks for the player
            PlayerTask.objects.filter(player=player, task__tags__name="daily").delete()

            # Randomly select 3 tasks from the daily tasks
            selected_tasks = random.sample(list(daily_tasks), 3)

            for task in selected_tasks:
                # Create a PlayerTask entry linking the player and task
                PlayerTask.objects.create(player=player, task=task, completed=False)

            self.stdout.write(f"Assigned 3 random daily tasks to player {player.username}")

        self.stdout.write("Daily tasks assigned successfully.")
