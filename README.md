# 🌐 Vocana - Multi-Language Translation App

**Vocana** is a full-stack AI-powered application that translates text between 60+ languages using Facebook's M2M100 model. Built with **FastAPI** for the backend and **React** for the frontend, VOCANA provides a fast, efficient, and intuitive platform for real-time translation.

---

## 🧠 Features

- 🌍 Translate between 60+ languages using `facebook/m2m100_418M`
- ⚡ FastAPI backend for API handling
- 🎨 React frontend for smooth UI/UX
- 🔄 Real-time translation using REST API
- 📦 Local model caching to avoid repeated downloads

---

## 🗂️ Project Structure

```
VOCANA/
│
├── aiml/                         # Backend - FastAPI for translation API
│   ├── app/                      # Main application logic
│   │   ├── __pycache__/          # Python bytecode cache
│   │   ├── main.py               # FastAPI app entry with routes
│   │   └── translator.py         # M2M100 model loading and translation logic
│   │
│   ├── models/                   # Stores locally downloaded model weights
│   │   └── (auto-downloaded model files)
│   │
│   ├── venv/                     # Python virtual environment (not committed)
│   │
│   └── requirements.txt          # Python dependencies
│
├── frontend/                     # Frontend - React app for UI
│   ├── public/                   # Static assets (HTML, icons, etc.)
│   ├── src/                      # React source code (components, pages, API utils)
│   ├── node_modules/             # Node.js packages (auto-generated)
│   ├── package.json              # Frontend project metadata and scripts
│   ├── package-lock.json         # Lockfile for reproducible builds
│
├── .gitignore                    # Root-level ignore config (includes models/, venv/, node_modules/)
└── README.md                     # Project documentation (You're here!)

```


---

## ⚙️ Backend Setup (FastAPI)

### ✅ Prerequisites

- Python 3.8+
- pip

### 🛠️ Installation & Run

```bash
# Navigate to backend directory
cd aiml

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate              # On Windows
source venv/bin/activate             # On macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --reload
```
### ✅ Test the API (Postman/cURL)
```bash
    Endpoint:
        POST http://localhost:8000/translate

    Sample Body:
            {
                "text": "आपका नाम क्या है?",
                "source_lang": "hi",
                "target_lang": "en"
            }



    Other Useful Endpoints:
        1) GET / → API Status
        2) GET /languages → Supported Languages
        3) GET /status → Model Load Status

```
---
## 💻 Frontend Setup (React)
### ✅ Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### 🛠️ Installation & Run

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

- Frontend will be accessible at:
        http://localhost:3000

---

## 🚀 Deployment Tips
- Backend: Deploy via Render, Railway, Heroku, Docker, etc.
- Frontend: Deploy via Vercel, Netlify, or link to backend with correct API URLs.

---

## 🧩 CORS Configuration
- In main.py:
    ```bash
    allow_origins=["*"]
    
    # Change to:
    allow_origins=["http://localhost:3000"]  # or deployed frontend URL for security```


## 🌐 Supported Languages

- VOCANA supports 60+ languages including Hindi (hi), English (en), French (fr), Japanese (ja), Spanish (es), and more. You can chek through this request to fetch full list dynamically.:

```bash
GET http://localhost:8000/languages
```

---

## 🧪 Example Translations

| Input Language | Text                     | Translated Language | Result              |
| -------------- | ------------------------ | ------------------- | ------------------- |
| Hindi (hi)     | आपका नाम क्या है?        | English (en)        | What is your name?  |
| French (fr)    | Bonjour, comment ça va ? | English (en)        | Hello, how are you? |
| German (de)    | Wie spät ist es?         | Spanish (es)        | ¿Qué hora es?       |


## 📞 Contact & Credits
 
Developed by **Kanhaiya Gupta** 

[![Website Badge](https://img.shields.io/badge/Visit-Portfolio-blue)](http://officialkanha.epizy.com/)

Model: *facebook/m2m100_418M*


