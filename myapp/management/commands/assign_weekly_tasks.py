import random
from django.core.management.base import BaseCommand
from myapp.models import Player, Task, PlayerTask

class Command(BaseCommand):
    help = "Assign 3 random weekly tasks to each player, removing previous weekly tasks"

    def handle(self, *args, **kwargs):
        players = Player.objects.all()
        weekly_tasks = list(Task.objects.filter(tags__name="weekly"))

        if len(weekly_tasks) < 3:
            raise ValueError("Not enough weekly tasks available! At least 3 required.")  # Explicit error

        for player in players:
            PlayerTask.objects.filter(player=player, task__tags__name="weekly").delete()

            selected_tasks = random.sample(weekly_tasks, 3)
            for task in selected_tasks:
                PlayerTask.objects.create(player=player, task=task, completed=False)

            self.stdout.write(f"Assigned 3 random weekly tasks to player {player.username}")

        self.stdout.write("Weekly tasks assigned successfully.")
