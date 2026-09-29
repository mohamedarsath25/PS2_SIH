# iTantra - Indian Multilingual TTS & STT Aided Neural Transceiver

Problem Statement ID: SIH26173
Project Name: iTantra – Indian Multilingual TTS & STT Aided Neural Transceiver Radio Access for Low Bitrate Links
Domain: Smart Automation / Communication

## Overview
iTantra is an intelligent low-bandwidth communication system that enables users to communicate through speech/text over unreliable or very low-bitrate radio links using advanced Semantic Extraction, Neural Compression, and Speech-To-Text/Text-To-Speech systems for Indian languages.

This prototype includes:
- FastAPI Backend (Python)
- React Frontend (TypeScript + Tailwind CSS + Vite)

## Prerequisites
- Node.js (v18+)
- Python (3.9+)

## Setup Instructions

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
```

Create a virtual environment and activate it:
```bash
# On Windows
python -m venv venv
venv\Scripts\activate
```

Install the dependencies:
```bash
pip install -r requirements.txt
```

Start the FastAPI backend server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The backend API will be available at `http://localhost:8000`
Swagger Docs available at `http://localhost:8000/docs`

### 2. Frontend Setup

Open a NEW terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

Install the Node.js dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`

## Features Implemented in Demo Mode
- **Multilingual Support**: Supports 10 Indian languages.
- **Voice Transmitter**: Simulated Speech-To-Text pipeline with semantic extraction and neural compression.
- **Low-Bitrate Radio Link Simulator**: Simulates packet loss, latency, and reconstruction accuracy based on emergency vs standard modes.
- **Dashboard**: Real-time stats and metrics visualization.

## Architecture
- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Python FastAPI, SQLite, Pydantic, SQLAlchemy
