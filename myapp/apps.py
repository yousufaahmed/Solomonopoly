# myapp/apps.py
from django.apps import AppConfig

class MyappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'

    def ready(self):
        # Import the scheduler and start it when the app is ready
        import myapp.scheduler  # Adjust the import path to your scheduler module
        myapp.scheduler.start_scheduler()  # Start the scheduler
