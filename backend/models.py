from pydantic import BaseModel
from typing import Optional, List

class MessageRequest(BaseModel):
    text: str
    language: str
    emergency: bool = False

class SimulationConfig(BaseModel):
    bitrate: float
    packet_loss: float
    noise_level: float
    latency: float

class TransmissionResult(BaseModel):
    original_text: str
    encoded_text: str
    compressed_size: int
    original_size: int
    compression_ratio: float
    packet_count: int
    lost_packets: int
    latency: float
    reconstructed_text: str
    quality_score: float
