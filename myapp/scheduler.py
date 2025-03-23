# myapp/scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django.core.management import call_command
import logging

logger = logging.getLogger(__name__)

def assign_daily_tasks():
    try:
        call_command('assign_daily_tasks')  # Calls the management command to assign tasks
        logger.info('Successfully assigned daily tasks to all players.')
    except Exception as e:
        logger.error(f"Error while assigning daily tasks: {e}")

def start_scheduler():
    scheduler = BackgroundScheduler()
    # Set the job to run at midnight every day
    scheduler.add_job(assign_daily_tasks, CronTrigger(hour=0, minute=0))
    scheduler.start()
