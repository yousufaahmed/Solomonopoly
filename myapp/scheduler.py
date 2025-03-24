#Contributors: Ernest
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django.core.management import call_command
import logging

logger = logging.getLogger(__name__)

def assign_daily_tasks():
    try:
        call_command('assign_daily_tasks')
        logger.info('Successfully assigned daily tasks to all players.')
    except Exception as e:
        logger.error(f"Error while assigning daily tasks: {e}")

def assign_weekly_tasks():
    try:
        call_command('assign_weekly_tasks')
        logger.info('Successfully assigned weekly tasks to all players.')
    except Exception as e:
        logger.error(f"Error while assigning weekly tasks: {e}")

scheduler = BackgroundScheduler()

# Schedule daily tasks at midnight every day
scheduler.add_job(assign_daily_tasks, CronTrigger(hour=0, minute=0))

# Schedule weekly tasks at midnight every Monday
scheduler.add_job(assign_weekly_tasks, CronTrigger(day_of_week='mon', hour=0, minute=0))

def start_scheduler():
    global scheduler
    if not scheduler.running:
        scheduler.start()
        atexit.register(lambda: scheduler.shutdown(wait=False))  # Ensure cleanup on exit
