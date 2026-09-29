from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, TransmissionHistory
from models import MessageRequest, SimulationConfig, TransmissionResult
import services

app = FastAPI(title="iTantra Neural Transceiver API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "system": "iTantra Neural Transceiver"}

@app.post("/api/stt")
async def stt_endpoint(language: str = Form(...), audio: UploadFile = File(None)):
    return {"text": "Simulation: Emergency. There is a medical issue at the base station."}

@app.post("/api/tts")
async def tts_endpoint(text: str = Form(...), language: str = Form(...)):
    return {"status": "success", "message": "Audio generated successfully (simulated)."}

@app.post("/api/transmit", response_model=TransmissionResult)
def transmit_message(req: MessageRequest, db: Session = Depends(get_db)):
    # Default simulation config
    config = SimulationConfig(
        bitrate=1200,
        packet_loss=15.0 if req.emergency else 5.0, # Just for demo variance
        noise_level=5.0,
        latency=200.0
    )
    result = services.run_full_pipeline(req, config)
    
    # Save to history
    history = TransmissionHistory(
        language=req.language,
        original_message=result["original_text"],
        encoded_size=result["original_size"], 
        compressed_size=result["compressed_size"],
        bitrate=config.bitrate,
        packet_count=result["packet_count"],
        lost_packets=result["lost_packets"],
        latency=result["latency"],
        reconstruction_status="Success" if result["quality_score"] > 0.5 else "Corrupted",
        quality_score=result["quality_score"]
    )
    db.add(history)
    db.commit()
    
    return result

@app.get("/api/history")
def get_history(db: Session = Depends(get_db)):
    return db.query(TransmissionHistory).order_by(TransmissionHistory.timestamp.desc()).limit(100).all()

@app.get("/api/languages")
def get_languages():
    return [
        {"code": "en", "name": "English"},
        {"code": "hi", "name": "Hindi"},
        {"code": "ta", "name": "Tamil"},
        {"code": "te", "name": "Telugu"},
        {"code": "kn", "name": "Kannada"},
        {"code": "ml", "name": "Malayalam"},
        {"code": "bn", "name": "Bengali"},
        {"code": "mr", "name": "Marathi"},
        {"code": "gu", "name": "Gujarati"},
        {"code": "pa", "name": "Punjabi"}
    ]
    
@app.get("/api/analytics")
def get_analytics(db: Session = Depends(get_db)):
    history = db.query(TransmissionHistory).all()
    if not history:
        return {"avg_latency": 0, "avg_quality": 0, "total_messages": 0}
    
    avg_lat = sum([h.latency for h in history]) / len(history)
    avg_qual = sum([h.quality_score for h in history]) / len(history)
    
    return {
        "avg_latency": round(avg_lat, 2),
        "avg_quality": round(avg_qual, 2),
        "total_messages": len(history)
    }
