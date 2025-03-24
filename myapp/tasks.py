# from celery import shared_task
# from datetime import datetime, timedelta
# from myapp.models import Task, PlayerTask, Player

# @shared_task
# def assign_daily_tasks():
#     """Assign daily tasks to all users at midnight."""
#     daily_tasks = Task.objects.filter(kind="daily")
#     players = Player.objects.all()

#     for player in players:
#         for task in daily_tasks:
#             # Has task been assigned today
#             if not PlayerTask.objects.filter(player=player, task=task, created_at__date=datetime.now().date()).exists():
#                 PlayerTask.objects.create(player=player, task=task, completed=False)

#     return "Daily tasks assigned successfully."

# @shared_task
# def assign_weekly_tasks():
#     """Assign weekly tasks every Monday at midnight."""
#     weekly_tasks = Task.objects.filter(kind="weekly")
#     players = Player.objects.all()

#     for player in players:
#         for task in weekly_tasks:
#             # Has task been assigned this week
#             start_of_week = datetime.now() - timedelta(days=datetime.now().weekday())
#             if not PlayerTask.objects.filter(player=player, task=task, created_at__gte=start_of_week).exists():
#                 PlayerTask.objects.create(player=player, task=task, completed=False)

#     return "Weekly tasks assigned successfully."

# @shared_task
# def remove_expired_tasks():
#     """Remove expired tasks from PlayerTask table."""
#     yesterday = datetime.now() - timedelta(days=1)
#     last_week = datetime.now() - timedelta(days=7)

#     # Remove expired daily tasks
#     PlayerTask.objects.filter(task__kind="daily", created_at__lt=yesterday).delete()

#     # Remove expired weekly tasks
#     PlayerTask.objects.filter(task__kind="weekly", created_at__lt=last_week).delete()

#     return "Expired tasks removed."