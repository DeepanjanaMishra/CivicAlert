CivicAlert
AI-Powered Emotion & Context Aware Citizen Grievance System

CivicAlert is an intelligent, full-stack complaint management system designed to improve how civic issues are handled.
Instead of treating all complaints equally, the system analyzes voice, emotion, and contextual signals to determine urgency and prioritize issues accordingly.

Overview

Traditional complaint systems lack prioritization and context awareness.
CivicAlert addresses this by integrating an AI pipeline that evaluates complaints beyond text, enabling faster and more meaningful responses.

Key Features
Voice-Based Complaint Submission
Users can submit complaints through audio, improving accessibility.
Speech-to-Text Processing
Converts voice input into structured text using Whisper.
Emotion-Aware Analysis
Detects emotional tone (e.g., anger, fear) to understand severity.
Dynamic Urgency Scoring
Combines text, keywords, and emotion to compute a priority score.
Automated Department Routing
Assigns complaints to relevant departments without manual intervention.
Role-Based Dashboards
Separate interfaces for citizens, authorities, and administrators with analytics.
System Workflow

User Input (Voice/Text)
→ React Frontend
→ Node.js Backend
→ AI Processing Layer

Speech-to-Text (Whisper API)
Emotion Detection (Flask API)
Context & Keyword Analysis
Urgency Scoring Engine
→ MongoDB Database
→ Dashboard Visualization
Technology Stack

Frontend
React.js, Tailwind CSS

Backend
Node.js, Express.js

Database
MongoDB with Mongoose

AI & Processing

Whisper (Speech-to-Text)
Custom Emotion Detection Model
Librosa (Audio Feature Extraction)
Project Structure

CivicAlert/
├── frontend/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── utils/
│ ├── emotion-api/
│ ├── whisper-api/
│ └── uploads/

Getting Started
Clone Repository

git clone https://github.com/your-username/CivicAlert.git

cd CivicAlert

Backend Setup

cd backend
npm install

Create a .env file:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Start backend:

npm run dev

Frontend Setup

cd frontend
npm install
npm run dev

Run AI Services

Emotion Detection API
cd backend/emotion-api
python app.py

Runs on:
http://127.0.0.1:5002

Whisper Speech-to-Text API
cd backend/whisper-api
python app.py

Runs on:
http://127.0.0.1:5001

Execution Flow
User submits complaint (voice/text)
Audio is processed through AI services
System extracts:
Transcription
Emotion
Keywords
Urgency score and priority are calculated
Complaint is stored and routed
Dashboards display insights and updates
Example Output

Input:
"Road conditions are dangerous and unsafe to walk"

System Output:

Emotion: Fearful
Urgency Score: High
Priority: Critical
Department: Infrastructure
Future Enhancements
Mobile application support
Real-time deployment for smart city use cases
Advanced analytics and prediction models
Integration with government systems
Author

Deepanjana Mishra

Note

This project is developed for academic and demonstration purposes, showcasing the integration of full-stack development with AI-driven analysis.
