
# Solomonopoly  
A gamified sustainability app promoting environmentally friendly habits through tasks, achievements, and rewards.

---

## Team Members

- Ernest Bozjigitov  
- Sri Guhanathan  
- Mohammed Shahid  
- Eliot Deacon  
- Yousuf Ahmed  
- Ahnaf Tahmid Haque  
- Aleem Abbas-Hussain  

---

## Project Overview

**Solomonopoly** is a full-stack web application designed to increase sustainability awareness and engagement on campus. Users complete real-world eco-friendly tasks (like recycling, walking, or saving water), earn coins, unlock achievements, and collect reward cards.  

The project uses:
- **Django REST Framework** for the backend
- **React with Vite** for the frontend
- PostgreSQL or SQLite for data storage
- Authentication via JWT

---

## Live Demo

- **Frontend** (hosted on Vercel): [https://solomonopoly.vercel.app](https://solomonopoly.vercel.app)  
- **Backend** (hosted on PythonAnywhere): [https://yousufaa.pythonanywhere.com](https://yousufaa.pythonanywhere.com)  
- **Trello Board**: [Solomonopoly Tasks](https://trello.com/b/M4YLqqFd/solomonopoly)
- **GitHub Link**: [Source Code](https://github.com/yousufaahmed/Solomonopoly)

---

## Backend Setup (Django)

### Create and activate virtual environment:
```bash
python -m venv env
source env/bin/activate      # Mac/Linux
.\env\Scripts\activate       # Windows
```

### Install dependencies:
```bash
pip install -r requirements.txt
```

### Run migrations and start server:
```bash
python manage.py migrate
python manage.py runserver
```

### Create a superuser:
```bash
python manage.py createsuperuser
# Visit: http://127.0.0.1:8000/admin
```

---

## Frontend Setup (React + Vite)

### Navigate to frontend folder:
```bash
cd frontend
```

### Install dependencies:
```bash
npm install
npm install react-leaflet-cluster canvas-confetti
```

### Start the development server:
```bash
npm run dev
```

### View the app:
- On local machine: `http://localhost:5173/`
- On mobile: use the "Network" URL in terminal

---

## Environment Configuration

Make sure your `.env` (not committed) looks like:
```env
REACT_APP_API_BASE=https://yousufaa.pythonanywhere.com
```

Then in your React code:
```js
axios.get(`${process.env.REACT_APP_API_BASE}/api/player/`);
```

---

## Testing

### Backend Tests (Django):
```bash
python manage.py test api.tests
```

### Frontend Tests (Jest):
```bash
cd frontend
npm install --save-dev jest
npm test
```

### Full-Stack Tests (Cypress):
```bash
npx cypress open
```

---

## Dependencies

**Backend:**
- Django
- djangorestframework
- django-cors-headers
- simplejwt

**Frontend:**
- React
- Vite
- Axios
- react-leaflet-cluster
- canvas-confetti
- Jest (for testing)
- Cypress (optional)

---

## Dev Notes

- After model/view changes:
```bash
python manage.py makemigrations myapp
python manage.py migrate
```

- If database needs resetting:
```bash
python manage.py shell

from myapp.models import Tag
for tag_value, tag_label in Tag.TagKind.choices:
    Tag.objects.get_or_create(name=tag_value)
```
