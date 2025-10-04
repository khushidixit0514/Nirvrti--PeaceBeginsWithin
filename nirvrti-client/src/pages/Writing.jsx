import React, { useState, useEffect } from 'react';
import './style.css';
const API_URL = process.env.REACT_APP_API_URL;
const Writing = () => {
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);

  // Fetch entries from backend on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust if you store token elsewhere
        const res = await fetch(`${API_URL}/api/writing`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setEntries(data);
        } else {
          alert('Failed to fetch entries');
        }
      } catch (error) {
        alert('Error fetching entries');
      }
    };

    fetchEntries();
  }, []);

  // Save new entry to backend
  const handleAdd = async () => {
    if (note.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/writing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: note }),
      });

      if (res.ok) {
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
        setNote('');
      } else {
        alert('Failed to save entry');
      }
    } catch (error) {
      alert('Error saving entry');
    }
  };

  // Delete specific entry from backend
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/writing/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setEntries(entries.filter((entry) => entry._id !== id));
      } else {
        alert('Failed to delete entry');
      }
    } catch (error) {
      alert('Error deleting entry');
    }
  };

  // Clear local entries state (like your existing Erase)
  const handleClear = () => {
    setEntries([]);
  };

  return (
    <div className="writing-space-container">
      <h1 className="writing-heading">"Write All Your Problems Here"</h1>
      <textarea
        className="writing-textarea"
        placeholder="Start writing here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="writing-buttons">
        <button className="add-btn" onClick={handleAdd}>
          Save My Thoughts
        </button>
        <button className="clear-btn" onClick={handleClear}>
          Erase Them All (Local)
        </button>
      </div>

      {entries.length > 0 && (
        <div className="entry-section">
          <h2>Your Entries</h2>
          <ul className="entry-list">
            {entries.map((entry) => (
              <li key={entry._id} className="entry-item">
                {entry.content}
               <button
  className="delete-btn"
  onClick={() => handleDelete(entry._id)}
  title="Delete this entry"
>
  🗑️
</button>

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Writing;
