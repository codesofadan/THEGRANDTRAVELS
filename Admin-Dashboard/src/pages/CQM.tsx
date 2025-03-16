import { useState, useEffect } from "react";
import { fetchQueries, updateQuery, addQueryNote } from "../api";

type Note = {
  text: string;
  createdAt: string;
};

type Query = {
  _id: string;
  name: string;
  status: string;
  email: string;
  message: string;
  createdAt?: string;
  notes: Note[];
};

const CQM: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    const loadQueries = async () => {
      const data: Query[] = await fetchQueries();
      setQueries(data);
    };
    loadQueries();
  }, []);

  const handleStatusChange = async (queryId: string, newStatus: string): Promise<void> => {
    await updateQuery(queryId, { status: newStatus });
    setQueries(queries.map(query => query._id === queryId ? { ...query, status: newStatus } : query));
    
    // Update selected query if it's the current one
    if (selectedQuery && selectedQuery._id === queryId) {
      setSelectedQuery({ ...selectedQuery, status: newStatus });
    }
  };

  const handleAddNote = async (queryId: string, noteText: string): Promise<void> => {
    if (!noteText.trim()) return;
    
    const newNote: Note = { text: noteText, createdAt: new Date().toISOString() };
    await addQueryNote(queryId, newNote);
    setQueries(queries.map(query => query._id === queryId ? { ...query, notes: [...query.notes, newNote] } : query));
    
    // Update selected query if it's the current one
    if (selectedQuery && selectedQuery._id === queryId) {
      setSelectedQuery({
        ...selectedQuery,
        notes: [...selectedQuery.notes, newNote]
      });
    }
    
    setNote("");
  };

  // Function to format JSON message to readable text format
  const formatQueryData = (message: string): JSX.Element => {
    try {
      // Try to parse as JSON
      const jsonData = JSON.parse(message);
      
      return (
        <div style={{ border: "1px solid #333", padding: "15px", borderRadius: "5px", backgroundColor: "#000000" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {Object.entries(jsonData).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: "1px solid #333" }}>
                  <td style={{ padding: "8px", fontWeight: "bold", width: "30%", color: "#ffcc00" }}>{formatKeyName(key)}:</td>
                  <td style={{ padding: "8px", color: "#ffffff" }}>{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } catch (e) {
      // If not valid JSON, return as is
      return <p style={{ whiteSpace: 'pre-wrap', backgroundColor: "#000000", color: "#ffffff", padding: "15px", borderRadius: "5px" }}>{message}</p>;
    }
  };

  // Function to format camelCase or snake_case keys to readable format
  const formatKeyName = (key: string): string => {
    // Replace underscores with spaces
    let formatted = key.replace(/_/g, ' ');
    
    // Convert camelCase to spaces
    formatted = formatted.replace(/([A-Z])/g, ' $1');
    
    // Capitalize first letter of each word
    return formatted
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "goldenrod" }}>Client Query Management</h2>
      <div>
        <h3>All Queries</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {queries.map(query => (
            <li key={query._id} style={{ marginBottom: "10px" }}>
              {query.name} - {query.status} - 
              <span>{query.createdAt ? new Date(query.createdAt).toLocaleString() : "N/A"}</span>
              <button 
                onClick={() => setSelectedQuery(query)} 
                style={{ marginLeft: "10px", backgroundColor: "goldenrod", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedQuery && (
        <div style={{ marginTop: "20px" }}>
          <h3>Query Details</h3>
          <p><strong>Name:</strong> {selectedQuery.name}</p>
          <p><strong>Email:</strong> {selectedQuery.email}</p>
          <p><strong>Status:</strong> {selectedQuery.status}</p>
          <p><strong>Date:</strong> {selectedQuery.createdAt ? new Date(selectedQuery.createdAt).toLocaleString() : "N/A"}</p>
          <div>
            <h4>Message Details:</h4>
            {formatQueryData(selectedQuery.message)}
          </div>
          <div style={{ marginTop: "20px" }}>
            <h4>Actions</h4>
            <button 
              onClick={() => handleStatusChange(selectedQuery._id, "Assigned to Agent")} 
              style={{ backgroundColor: "goldenrod", border: "none", padding: "5px 10px", cursor: "pointer", marginRight: "10px", borderRadius: "5px" }}
            >
              Assign to Agent
            </button>
            <button 
              onClick={() => handleStatusChange(selectedQuery._id, "Talked with Client")} 
              style={{ backgroundColor: "goldenrod", border: "none", padding: "5px 10px", cursor: "pointer", marginRight: "10px", borderRadius: "5px" }}
            >
              Talked with Client
            </button>
            <button 
              onClick={() => handleStatusChange(selectedQuery._id, "Client Applied for Booking")} 
              style={{ backgroundColor: "goldenrod", border: "none", padding: "5px 10px", cursor: "pointer", marginRight: "10px", borderRadius: "5px" }}
            >
              Client Applied for Booking
            </button>
            <button 
              onClick={() => handleStatusChange(selectedQuery._id, "Resolved")} 
              style={{ backgroundColor: "goldenrod", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}
            >
              Resolved
            </button>
            <div style={{ marginTop: "20px" }}>
              <h4>Add Note</h4>
              <textarea 
                value={note} 
                onChange={(e) => setNote(e.target.value)} 
                style={{ width: "100%", height: "100px", padding: "10px", marginBottom: "10px" }}
                placeholder="Enter your note here..."
              ></textarea>
              <button 
                onClick={() => handleAddNote(selectedQuery._id, note)} 
                style={{ backgroundColor: "goldenrod", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}
              >
                Add Note
              </button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h4>Notes</h4>
              {selectedQuery.notes.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {selectedQuery.notes.map((note, index) => (
                    <li key={index} style={{ 
                      marginBottom: "10px", 
                      padding: "10px", 
                      backgroundColor: "#f5f5f5", 
                      borderRadius: "5px" 
                    }}>
                      <div style={{ whiteSpace: 'pre-wrap', color: "#333" }}>{note.text}</div>
                      <div style={{ fontSize: "0.8em", color: "#777", marginTop: "5px" }}>
                        {new Date(note.createdAt).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notes yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CQM;