import React, { useState, useEffect } from "react";
import { fetchQueries, updateQuery, addQueryNote } from "../api";

const CQM = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const loadQueries = async () => {
      const data = await fetchQueries();
      setQueries(data);
    };
    loadQueries();
  }, []);

  const handleStatusChange = async (queryId, newStatus) => {
    const updatedQuery = await updateQuery(queryId, { status: newStatus });
    setQueries(queries.map(query => query._id === queryId ? updatedQuery : query));
  };

  const handleAddNote = async (queryId, note) => {
    const updatedQuery = await addQueryNote(queryId, note);
    setQueries(queries.map(query => query._id === queryId ? updatedQuery : query));
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
            <button onClick={() => handleStatusChange(selectedQuery._id, "Talked with Client")}>Talked with Client</button>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Client Applied for Booking")}>Client Applied for Booking</button>
            <button onClick={() => handleStatusChange(selectedQuery._id, "Resolved")}>Resolved</button>
            
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