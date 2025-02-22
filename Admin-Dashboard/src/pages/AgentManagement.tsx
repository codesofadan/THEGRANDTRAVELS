import { useState, useEffect } from 'react';
import axios from 'axios';

const AgentManagement = () => {
  const [selectedTab, setSelectedTab] = useState('allAgents');
  interface Agent {
    _id: string;
    name: string;
    email: string;
    performanceStats: {
      queriesOpened: number;
      queriesResponded: number;
      bookingsMade: number;
      invoicesGenerated: number;
    };
  }

  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);

  useEffect(() => {
    if (selectedTab === 'allAgents') {
      fetchAgents();
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === 'activityLog' && selectedAgentId) {
      fetchActivityLog(selectedAgentId);
    }
  }, [selectedTab, selectedAgentId]);

  const fetchAgents = async () => {
    try {
      const response = await axios.get('https://trevel-backend.vercel.app/api/agents');
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  interface ActivityLogEntry {
    action: string;
    timestamp: string;
  }

  const fetchActivityLog = async (agentId: string): Promise<void> => {
    try {
      const response = await axios.get<ActivityLogEntry[]>(`https://trevel-backend.vercel.app/api/agents/${agentId}/activity-log`);
      setActivityLog(response.data);
    } catch (error) {
      console.error('Error fetching activity log:', error);
    }
  };

  const handleAddAgent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post('https://trevel-backend.vercel.app/api/agents', { name, email, password });
      alert('Agent added successfully');
      setName('');
      setEmail('');
      setPassword('');
      fetchAgents();
    } catch (error) {
      console.error('Error adding agent:', error);
      alert('Error adding agent');
    }
  };

  const renderAllAgents = () => (
    <div>
      <h2>All Agents</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Queries Opened</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Queries Responded</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bookings Made</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Invoices Generated</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Activity Log</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{agent.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{agent.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{agent.performanceStats.queriesOpened}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{agent.performanceStats.queriesResponded}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{agent.performanceStats.bookingsMade}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{agent.performanceStats.invoicesGenerated}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => { setSelectedAgentId(agent._id); setSelectedTab('activityLog'); }} style={{ padding: '5px 10px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  View Log
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAddAgent = () => (
    <div>
      <h2>Add Agent</h2>
      <form onSubmit={handleAddAgent}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginLeft: '10px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Agent
        </button>
      </form>
    </div>
  );

  const renderActivityLog = () => (
    <div>
      <h2>Activity Log</h2>
      <button onClick={() => setSelectedTab('allAgents')} style={{ padding: '10px 20px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}>
        Back to All Agents
      </button>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {activityLog.map((log, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {log.action} - {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'allAgents':
        return renderAllAgents();
      case 'addAgent':
        return renderAddAgent();
      case 'activityLog':
        return renderActivityLog();
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Agent Management</h1>
      <div className="tabs" style={{ marginBottom: '20px' }}>
        <button onClick={() => setSelectedTab('allAgents')} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: selectedTab === 'allAgents' ? 'goldenrod' : '#f1f1f1', color: selectedTab === 'allAgents' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          All Agents
        </button>
        <button onClick={() => setSelectedTab('addAgent')} style={{ padding: '10px 20px', backgroundColor: selectedTab === 'addAgent' ? 'goldenrod' : '#f1f1f1', color: selectedTab === 'addAgent' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Agent
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AgentManagement;