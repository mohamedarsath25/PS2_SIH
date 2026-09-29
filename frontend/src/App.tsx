import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transmit from './components/Transmit';
import RadioSimulator from './components/RadioSimulator';
import Receive from './components/Receive';
import Analytics from './components/Analytics';
import MessageHistory from './components/MessageHistory';
import Architecture from './components/Architecture';
import Settings from './components/Settings';

function App() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transmit" element={<Transmit />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/simulator" element={<RadioSimulator />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/history" element={<MessageHistory />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
