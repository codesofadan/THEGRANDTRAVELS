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
  };

  const handleAddNote = async (queryId: string, noteText: string): Promise<void> => {
    const newNote: Note = { text: noteText, createdAt: new Date().toISOString() };
    await addQueryNote(queryId, newNote);
    setQueries(queries.map(query => query._id === queryId ? { ...query, notes: [...query.notes, newNote] } : query));
    setNote("");
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
          <p><strong>Message:</strong> {selectedQuery.message}</p>
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
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {selectedQuery.notes.map((note, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    {note.text} - {new Date(note.createdAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CQM;