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
    <div>
      <h2>Client Query Management</h2>
      <div>
        <h3>All Queries</h3>
        <ul>
          {queries.map(query => (
            <li key={query._id}>
              {query.name} - {query.status}
              <button onClick={() => setSelectedQuery(query)}>View</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedQuery && (
        <div>
          <h3>Query Details</h3>
          <p>{selectedQuery.name}</p>
          <p>{selectedQuery.email}</p>
          <p>{selectedQuery.message}</p>
          <div>
            <h4>Actions</h4>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Assigned to Agent")}>Assign to Agent</button>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Talked with Client")}>Talked with Client</button>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Client Applied for Booking")}>Client Applied for Booking</button>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Resolved")}>Resolved</button>
            <div>
              <h4>Add Note</h4>
              <textarea value={note} onChange={(e) => setNote(e.target.value)}></textarea>
              <button onClick={() => handleAddNote(selectedQuery._id, note)}>Add Note</button>
            </div>
            <div>
              <h4>Notes</h4>
              <ul>
                {selectedQuery.notes.map((note, index) => (
                  <li key={index}>{note.text} - {new Date(note.createdAt).toLocaleString()}</li>
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