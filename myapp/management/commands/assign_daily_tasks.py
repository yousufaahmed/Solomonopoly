import random
from django.core.management.base import BaseCommand
from myapp.models import Player, Task, PlayerTask

class Command(BaseCommand):
    help = "Assign 3 random daily tasks to each player, removing previous daily tasks"

    def handle(self, *args, **kwargs):
        players = Player.objects.all()
        daily_tasks = list(Task.objects.filter(tags__name="daily"))

        if len(daily_tasks) < 3:
            raise ValueError("Not enough daily tasks available! At least 3 required.")  # Explicit error

        for player in players:
            PlayerTask.objects.filter(player=player, task__tags__name="daily").delete()

            selected_tasks = random.sample(daily_tasks, 3)
            for task in selected_tasks:
                PlayerTask.objects.create(player=player, task=task, completed=False)

            self.stdout.write(f"Assigned 3 random daily tasks to player {player.username}")

        self.stdout.write("Daily tasks assigned successfully.")
