import { useState, useEffect } from "react";
import { fetchQueries, updateQuery, addQueryNote, Query, Note } from "../api";

const CQM = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const loadQueries = async () => {
      const data = await fetchQueries();
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
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Client Query Management</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>All Queries</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {queries.map(query => (
            <li key={query._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
              {query.name} - {query.status}
              <button onClick={() => setSelectedQuery(query)} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedQuery && (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Query Details</h3>
          <p><strong>Name:</strong> {selectedQuery.name}</p>
          <p><strong>Email:</strong> {selectedQuery.email}</p>
          <p><strong>Message:</strong> {selectedQuery.message}</p>
          <div style={{ marginTop: '20px' }}>
            <h4>Actions</h4>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Assigned to Agent")} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Assign to Agent
            </button>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Talked with Client")} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Talked with Client
            </button>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Client Applied for Booking")} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Client Applied for Booking
            </button>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Resolved")} style={{ padding: '10px 20px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Resolved
            </button>
            <div style={{ marginTop: '20px' }}>
              <h4>Add Note</h4>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '10px' }}></textarea>
              <button onClick={() => handleAddNote(selectedQuery._id, note)} style={{ padding: '10px 20px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Add Note
              </button>
            </div>
            <div style={{ marginTop: '20px' }}>
              <h4>Notes</h4>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {selectedQuery.notes.map((note, index) => (
                  <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
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