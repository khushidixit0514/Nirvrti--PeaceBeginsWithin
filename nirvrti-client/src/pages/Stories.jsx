import React, { useState, useEffect, useCallback } from "react";
import { FaTrash } from "react-icons/fa";
import "./style.css";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewMode, setViewMode] = useState("all");
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    anonymous: false,
  });

  // Fetch userId from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
      setUserId(decoded.id);
    }
  }, []);

  // Fetch stories
  const fetchStories = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`/api/stories?userOnly=${viewMode === "my"}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStories(data);
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  }, [viewMode]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const categories = ["All", ...new Set(stories.map((s) => s.category))];

  const filteredStories = stories.filter(
    (story) =>
      (filterCategory === "All" || story.category === filterCategory) &&
      (story.title.toLowerCase().includes(search.toLowerCase()) ||
        (story.excerpt && story.excerpt.toLowerCase().includes(search.toLowerCase())))
  );

  const handlePostStory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const newStory = await res.json();
      setStories([newStory, ...stories]);
      setShowForm(false);
      setFormData({ title: "", content: "", category: "", author: "", anonymous: false });
    } catch (err) {
      console.error("Error posting story:", err);
    }
  };

  const handleDeleteStory = async (storyId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      await fetch(`/api/stories/${storyId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setStories(stories.filter((story) => story._id !== storyId));
    } catch (err) {
      console.error("Error deleting story:", err);
    }
  };

  return (
    <main className="stories-page">
      <h1>Stories from the Heart</h1>
      <p>Read, relate, and share your journey.</p>

      <div className="view-mode-buttons">
        <button
          className={viewMode === "all" ? "btn-primary" : ""}
          onClick={() => setViewMode("all")}
        >
          All Stories
        </button>
        <button
          className={viewMode === "my" ? "btn-primary" : ""}
          onClick={() => setViewMode("my")}
        >
          My Stories
        </button>
      </div>

      <div className="stories-controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={() => setShowForm(true)}>+ Share Your Story</button>
      </div>

      <div className="stories-grid">
        {filteredStories.length === 0 && <p>No stories found.</p>}
        {filteredStories.map((story) => (
          <div key={story._id} className="story-card">
            <div onClick={() => setSelectedStory(story)}>
              <h3>{story.title}</h3>
              <p>{story.excerpt}</p>
              <span>{story.category} • {new Date(story.date).toLocaleDateString()}</span>
            </div>
            {story.user === userId && (
              <FaTrash
                className="delete-icon"
                onClick={() => handleDeleteStory(story._id)}
                title="Delete story"
              />
            )}
          </div>
        ))}
      </div>

      {selectedStory && (
        <div className="modal" onClick={() => setSelectedStory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedStory.title}</h2>
            <p>{selectedStory.content}</p>
            <p>By {selectedStory.author} • {new Date(selectedStory.date).toLocaleDateString()}</p>
            <button onClick={() => setSelectedStory(null)}>Close</button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Share Your Story</h2>
            <form onSubmit={handlePostStory}>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <textarea
                placeholder="Content"
                rows="5"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
              <label>
                <input
                  type="checkbox"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                /> Post as Anonymous
              </label>
              <button type="submit">Post Story</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Stories;
