import time
import random
from models import MessageRequest, SimulationConfig

def demo_stt(audio_data: bytes, language: str) -> str:
    # In a real scenario, we'd call an AI model
    time.sleep(0.5)
    return "Emergency. There is a medical issue at the base station."

def process_semantic(text: str, emergency: bool):
    # Mock NLP processing
    time.sleep(0.3)
    important_keywords = ["Emergency", "medical", "issue", "base", "station", "SOS", "fire"]
    return [word for word in text.split() if word.strip(".,") in important_keywords]

def encode_and_compress(text: str, emergency: bool):
    time.sleep(0.2)
    original_size = len(text.encode('utf-8'))
    # Simulate neural compression
    compressed_size = max(10, int(original_size * (0.3 if emergency else 0.5)))
    packets = max(1, compressed_size // 8)
    return original_size, compressed_size, packets

def simulate_transmission(packets: int, config: SimulationConfig):
    time.sleep(config.latency / 1000.0 + (packets * 0.05))
    lost = 0
    for _ in range(packets):
        if random.random() < config.packet_loss / 100.0:
            lost += 1
    return lost

def reconstruct_message(text: str, lost_packets: int, total_packets: int):
    loss_ratio = lost_packets / total_packets if total_packets > 0 else 0
    if loss_ratio > 0.4:
        quality = 1.0 - loss_ratio
        return text[:max(1, int(len(text)*quality))] + " [CORRUPTED]", quality
    return text, 1.0 - (loss_ratio * 0.5)

def run_full_pipeline(req: MessageRequest, config: SimulationConfig):
    orig_size, comp_size, total_packets = encode_and_compress(req.text, req.emergency)
    lost_packets = simulate_transmission(total_packets, config)
    reconstructed, quality = reconstruct_message(req.text, lost_packets, total_packets)
    
    return {
        "original_text": req.text,
        "encoded_text": "010011010111001001100101...",  # simulated binary
        "compressed_size": comp_size,
        "original_size": orig_size,
        "compression_ratio": round(orig_size / comp_size if comp_size else 1, 2),
        "packet_count": total_packets,
        "lost_packets": lost_packets,
        "latency": config.latency + (total_packets * 50),
        "reconstructed_text": reconstructed,
        "quality_score": quality
    }
