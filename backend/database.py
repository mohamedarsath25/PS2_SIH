from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime

DATABASE_URL = "sqlite:///./itantra.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class TransmissionHistory(Base):
    __tablename__ = "transmissions"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    language = Column(String)
    original_message = Column(String)
    encoded_size = Column(Integer)
    compressed_size = Column(Integer)
    bitrate = Column(Float)
    packet_count = Column(Integer)
    lost_packets = Column(Integer)
    latency = Column(Float)
    reconstruction_status = Column(String)
    quality_score = Column(Float)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
