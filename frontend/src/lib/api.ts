import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export interface Language {
  code: string;
  name: string;
}

export interface TransmissionResult {
  original_text: string;
  encoded_text: string;
  compressed_size: number;
  original_size: number;
  compression_ratio: number;
  packet_count: number;
  lost_packets: number;
  latency: number;
  reconstructed_text: string;
  quality_score: number;
}

export const api = {
  getLanguages: async (): Promise<Language[]> => {
    const res = await axios.get(`${API_BASE}/languages`);
    return res.data;
  },
  
  transmit: async (text: string, language: string, emergency: boolean): Promise<TransmissionResult> => {
    const res = await axios.post(`${API_BASE}/transmit`, {
      text, language, emergency
    });
    return res.data;
  },
  
  stt: async (audioBlob: Blob, language: string): Promise<{text: string}> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');
    formData.append('language', language);
    const res = await axios.post(`${API_BASE}/stt`, formData);
    return res.data;
  },
  
  getAnalytics: async () => {
    const res = await axios.get(`${API_BASE}/analytics`);
    return res.data;
  },
  
  getHistory: async () => {
    const res = await axios.get(`${API_BASE}/history`);
    return res.data;
  }
};
