# Solomonopoly
Sustainability Project

## BACKEND

### 1 - Start virtual environment in terminal

python -m venv env 

.\env\Scripts\activate  <- WINDOWS

source env/bin/activate <- MacOS

### Download dependencies

pip install -r requirements.txt

run django server

python manage.py runserver

## MAKE SUPER USER TO MANUALLY ADD ENTRIES TO DATABASE

1. python manage.py createsuperuser
2. http://127.0.0.1:8000/admin


## AFTER CHANGES LIKE ADDING A DIRECTORY OR CHANGING MODEL OR ADDING VIEWS

1. python manage.py makemigrations myapp
2. python manage.py migrate


## RUN FRONTEND

### 1 - Enter frontend folder

cd frontend

### 2 - Start virtual environment in terminal

python -m venv env 

.\env\Scripts\activate  <- WINDOWS

source env/bin/activate <- MacOS


### 3 - Download Dependencies

npm install

### 4 - Run app

npm run dev

### 5 (Mobile) - View website

Enter the web address provided under "Network" into your Chrome browser. 

e.g. https://XXX.XXX.X.XXX:XXXX/

### 5 (Laptop/PC) - View Website

Enter the web address provided under "Network" into your Chrome browser.

Or if using on the same machine select the first server under "Local"

Right-click, select "Inspect" and enter: 

CONTROL + SHIFT + M -> WINDOWS
COMMAND + SHIFT + M -> MACOS

to enter Mobile view

## FRONTEND TESTING

### 1 - Enter frontend folder

cd frontend

### 2 - Start virtual environment in terminal

python -m venv env 

.\env\Scripts\activate  <- WINDOWS

source env/bin/activate <- MacOS

### 3 - Download Dependencies

npm install --save-dev jest

### 4 - Run tests

npm test

## BACKEND TESTING

Run Django Tests:

python manage.py test

Run Frontend Tests:

cd frontend
npm test

Run full-stack tests (cypress or Playwright):
npx cypress open


FRONTEND TEMPLATE COMES FROM HERE:
https://github.com/techwithtim/Django-React-Full-Stack-App
