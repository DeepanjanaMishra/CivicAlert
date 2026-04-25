CivicAlert
AI-Powered Emotion and Context Aware Citizen Grievance System

CivicAlert is a full-stack AI-based complaint management system that enhances traditional reporting platforms by analyzing emotion, context, and keywords to determine the urgency of complaints.

Instead of treating all complaints equally, the system prioritizes issues intelligently so that critical problems receive faster attention.

Key Features

Voice-based complaint submission

Speech-to-text conversion using Whisper

Emotion detection from audio

Intelligent urgency scoring

Automatic department assignment

Role-based dashboards (Citizen, Authority, Admin)

System Architecture

User (Voice/Text)

→ Frontend (React)

→ Backend (Node.js + Express)

→ AI Processing Pipeline:

Whisper API (speech to text)

Emotion Detection API

Keyword extraction

Context classification

Urgency scoring

→ MongoDB

→ Dashboard visualization

Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

AI Components:

Whisper (speech-to-text)

Custom emotion detection model

Librosa (audio processing)

Project Structure

CivicAlert/
├── civicalert-frontend/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── utils/
│ ├── emotion-api/app.py
│ ├── whisper-api.py
│ └── uploads/

How to Run the Project
1. Clone the repository

git clone https://github.com/your-username/CivicAlert.git

cd CivicAlert

2. Backend Setup

cd backend
npm install

Create a .env file:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Run backend:

npm run dev

3. Frontend Setup

cd frontend
npm install
npm run dev

4. Run Emotion Detection API

cd backend/emotion-api
python app.py

Endpoint:
http://127.0.0.1:5002/predict-emotion

5. Run Whisper API

cd backend/whisper-api
python app.py

Endpoint:
http://127.0.0.1:5001/transcribe

Run Order

Backend server

Emotion API (port 5002)

Whisper API (port 5001)

Frontend server


How It Works

User records a complaint

Audio is uploaded via frontend

Backend sends audio to:

Whisper API → transcription

Emotion API → emotion detection

Analyzer processes:

Keywords

Context

Urgency score

Priority

Department

Complaint is stored in MongoDB

Displayed in dashboards

Future Scope

Mobile application

Real-time deployment

Advanced analytics

Improved AI models

License

This project is for academic and demonstration purposes.
