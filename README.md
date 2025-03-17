# Solomonopoly
Sustainability Project

## Members
1. Ernest Bozjigitov
2. Sri Guhanathan
3. Mohammed Shahid  
4. Eliot Deacon
5. Yousuf Ahmed
6. Ahnaf Tahmid Haque
7. Aleem Abbas-Hussain

## Trello link
https://trello.com/b/M4YLqqFd/solomonopoly

## BACKEND

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

## RUN FRONTEND

### 1 - Enter frontend folder
cd frontend

### 2 - Start virtual environment in terminal
python -m venv env

.\env\Scripts\activate <- WINDOWS

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

.\env\Scripts\activate <- WINDOWS

source env/bin/activate <- MacOS

### 3 - Download Dependencies
npm install --save-dev jest

###4 - Run tests
npm test

# TESTING

Run Django Tests:


To run all backend tests, execute the following command from the **root directory**:  


python manage.py test api.tests

Run Frontend Tests:

cd frontend
npm test

Run full-stack tests (cypress or Playwright):
npx cypress open


FRONTEND TEMPLATE COMES FROM HERE:
https://github.com/techwithtim/Django-React-Full-Stack-App
