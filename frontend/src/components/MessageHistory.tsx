import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Clock, Download, CheckCircle, XCircle } from 'lucide-react';

export default function MessageHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHistory().then(data => {
      setHistory(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transmission History</h2>
          <p className="text-gray-400 mt-1">Logs of all messages transmitted through the neural transceiver.</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading history...</div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No transmissions recorded yet. Send a message to see it here.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-border">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Language</th>
                  <th className="px-6 py-4">Compression</th>
                  <th className="px-6 py-4">Network</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {history.map((record) => (
                  <tr key={record.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {new Date(record.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate font-medium text-white" title={record.original_message}>
                        {record.original_message}
                      </div>
                    </td>
                    <td className="px-6 py-4 uppercase font-bold text-primary">{record.language}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-green-400 font-mono">{record.encoded_size}B → {record.compressed_size}B</span>
                        <span className="text-xs text-gray-500">{(record.encoded_size / record.compressed_size).toFixed(1)}x ratio</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col font-mono">
                        <span>{record.latency}ms</span>
                        <span className="text-xs text-red-400">{record.lost_packets}/{record.packet_count} lost</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {record.reconstruction_status === 'Success' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          <CheckCircle className="w-3 h-3" /> {(record.quality_score * 100).toFixed(0)}% Quality
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                          <XCircle className="w-3 h-3" /> Corrupted
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
