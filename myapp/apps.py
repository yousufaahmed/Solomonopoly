# Contributors: Ernest
import os
from django.apps import AppConfig

class MyappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'

    def ready(self):
        if os.environ.get('RUN_MAIN') == 'true':  # Prevents duplicate schedulers in dev mode
            from myapp import scheduler  # Import scheduler module only when needed
            if not scheduler.scheduler.running:  # Ensures scheduler starts only once
                scheduler.start_scheduler()
        
        # Import signals to ensure they are loaded
        import myapp.signals
