# Solomonopoly
Sustainability Project

virtual Environment
python -m venv env  

.\env\Scripts\activate  

download dependencies
pip install -r requirements.txt

run django server
python manage.py runserver


## MAKE SUPER USER TO MANUALLY ADD ENTRIES TO DATABASE

1) python manage.py createsuperuser
2) http://127.0.0.1:8000/admin


## AFTER CHANGES LIKE ADDING A DIRECTORY OR CHANGING MODEL OR ADDING VIEWS

1) python manage.py makemigrations myapp
2) python manage.py migrate

