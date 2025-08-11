import React, { useState, useRef, useEffect } from "react";
import "./style.css";

export default function Capsule() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("😊");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState([]);
  const [audio, setAudio] = useState(null);
  const [openDate, setOpenDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [password, setPassword] = useState("");
  const [capsules, setCapsules] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchCapsules() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/capsule", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch capsules");
        const data = await res.json();
        setCapsules(data);
      } catch (error) {
        console.error("Failed to load capsules:", error);
      }
    }
    fetchCapsules();
  }, []);

  function handleFiles(e) {
    const list = Array.from(e.target.files).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      url: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...list]);
  }

  function handleAudio(e) {
    const f = e.target.files[0];
    if (!f) return;
    setAudio({ name: f.name, url: URL.createObjectURL(f), size: f.size });
  }

  function clearForm() {
    setTitle("");
    setMessage("");
    setMood("😊");
    setTags("");
    setFiles([]);
    setAudio(null);
    setOpenDate("");
    setReminderDate("");
    setPrivacy("private");
    setPassword("");
    setPreviewOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  async function handleSave() {
    if (!title.trim() || !message.trim()) {
      alert("Please provide at least a title and message.");
      return;
    }
    const capsuleData = {
      title,
      content: message,
      openDate: openDate || null,
      // Add mood, tags, privacy etc if backend supports those fields
    };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to save a capsule.");
      return;
    }

    try {
      const res = await fetch("/api/capsule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(capsuleData),
      });

      if (!res.ok) throw new Error("Failed to save capsule");

      const savedCapsule = await res.json();
      setCapsules((c) => [savedCapsule, ...c]);
      clearForm();
      alert("Capsule saved successfully.");
      setPreviewOpen(false);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this capsule permanently?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a capsule.");
      return;
    }

    try {
      const res = await fetch(`/api/capsule/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete capsule");

      setCapsules((c) => c.filter((x) => x._id !== id));
    } catch (error) {
      alert(error.message);
    }
  }

  function isLocked(capsule) {
    if (!capsule.openDate) return false;
    const now = new Date();
    const open = new Date(capsule.openDate);
    return now < open;
  }

  return (
    <div className="capsule-root">
      <h1 className="capsule-title">Time Capsule — Nirvrti</h1>

      <div className="capsule-grid">
        <div className="capsule-form card">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A message to future me"
          />

          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="Write your letter..."
          />

          <label>Mood</label>
          <div className="mood-row">
            {["😊", "😔", "😡", "😅", "🤩", "😴", "🤔"].map((m) => (
              <button
                key={m}
                type="button"
                className={mood === m ? "mood-btn active" : "mood-btn"}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
            <span className="selected">{mood}</span>
          </div>

          <label>Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. gratitude,career,breakup"
          />

          <label>Attach files (images, docs)</label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFiles}
          />

          <label>Attach audio (voice note)</label>
          <input type="file" accept="audio/*" onChange={handleAudio} />

          <label>Open On (date) — when capsule unlocks</label>
          <input
            type="date"
            value={openDate}
            onChange={(e) => setOpenDate(e.target.value)}
          />

          <label>Reminder (optional date)</label>
          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />

          <label>Privacy</label>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
          >
            <option value="private">Private (only you)</option>
            <option value="public">Public (anyone on site)</option>
            <option value="password">Password protected</option>
          </select>
          {privacy === "password" && (
            <input
              placeholder="Set a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <div className="form-actions">
            <button
              className="btn"
              onClick={() => setPreviewOpen(true)}
              type="button"
            >
              Preview
            </button>
            <button
              className="btn primary"
              onClick={handleSave}
              type="button"
            >
              Save Capsule
            </button>
            <button
              className="btn ghost"
              onClick={clearForm}
              type="button"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="capsule-list card">
          <h2>Saved Capsules</h2>
          {capsules.length === 0 && (
            <p className="muted">No capsules yet — create your first one!</p>
          )}
          <ul>
            {capsules.map((c) => (
              <li key={c._id} className={isLocked(c) ? "locked" : ""}>
                <div className="item-head">
                  <strong>{c.title}</strong>
                  <span className="meta">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="item-body">
                  <div className="mood-small">{c.mood}</div>
                  <div className="tags-small">{c.tags?.join(", ")}</div>
                  <div className="capsule-controls">
                    <button
                      onClick={() => alert(c.content)}
                      className="btn small"
                      type="button"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => {
                        const data = JSON.stringify(c, null, 2);
                        const blob = new Blob([data], {
                          type: "application/json",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${c.title || "capsule"}_${c._id}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="btn small"
                      type="button"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="btn small danger"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {isLocked(c) && (
                  <div className="locked-overlay">
                    Locked until {new Date(c.openDate).toDateString()}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {previewOpen && (
        <div className="preview-modal">
          <div className="preview-card">
            <h3>Preview — {title || "(no title)"}</h3>
            <div className="preview-meta">
              Mood: {mood} • Tags: {tags}
            </div>
            <p className="preview-message">{message}</p>
            {files.length > 0 && (
              <div className="preview-files">
                <h4>Attachments</h4>
                <div className="file-grid">
                  {files.map((f, idx) => (
                    <div key={idx} className="file-item">
                      <a href={f.url} target="_blank" rel="noreferrer">
                        {f.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {audio && (
              <div className="preview-audio">
                <h4>Audio</h4>
                <audio controls src={audio.url}></audio>
              </div>
            )}
            <div className="preview-actions">
              <button
                className="btn primary"
                onClick={handleSave}
                type="button"
              >
                Confirm & Save
              </button>
              <button
                className="btn ghost"
                onClick={() => setPreviewOpen(false)}
                type="button"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
