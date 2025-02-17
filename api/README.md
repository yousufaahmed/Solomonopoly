### API

## Set-Up
1) activate the virtual environment
2) install dependencies: pip install requirements.txt
3) makemigrations
4) python manage.py runserver

## Testing Functionality (while front-end isn't integrated and you aren't authorised):
1) change permission_classes = [IsAdminUser] or [IsAuthenticated] to  permission_classes = [AllowAny]
2) start the application
3) navigate to the desired endpoint (listed below)
4) once finished checking change permission_classes back to the original

## Endpoints 
For User Registration and accessing/refreshing JWT tokens:
1) python manage.py runserver
2) navigate to http://localhost:8000/api/user/register/ to create a user
3) navigate to http://localhost:8000/api/token/ and enter user credentials to recieve jwt access and refresh tokens
4) navigate to http://localhost:8000/api/token/refresh/ and enter the refresh token to recieve a new access token

Task Endpoints:
5) navigate to http://localhost:8000/api/tasks/ to view list of tasks - you will need to be authenticated as an admin to do this
6) navigate to http://localhost:8000/api/task/ to create a task - you will need to be authenticated as an admin to do this
7) navigate to http://localhost:8000/api/task/<task_id>/ to view task details - you will need to be an authenticated user to do this
8) navigate to http://localhost:8000/api/task/<task_id>/update/ to update task details - you will need to be authenticated as an admin to do this

Card Endpoints:
9) navigate to http://localhost:8000/api/cards/ to view a list of cards - you will need to be authenticated as an admin to do this
10) navigate to http://localhost:8000/api/card/<card_id>/ to view a cards details - you will need to be an authenticated user to do this
11) navigate to http://localhost:8000/api/player/<player_id>/purchases/ to  view the card purchase records of a user - you will need to be authenticated to do this

## Current Issues:
Lots of code for the api is commented out (including many endpoints) until the following changes are made
Changes to be made to database:
1) need to integrate in-built django User model
   - this will be needed for user authentication
   - also needed for registry
2) could help to include __str__ method for some models for easier referencing:
3) the purchases model doesn't allow users to purchase the same card twice (they should be allowed to do this. In what card game is this disallowed?)
Other changes:
1) wider integration of django's User model
2) alteration of certain serializers
   - purchases serializer needs to be changed to allow multiple purchases of the same card
  
