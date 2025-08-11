import React, { useState, useEffect } from "react";
import "./style.css";

const issuesData = [
  {
    id: 1,
    title: "Stress & Anxiety",
    description: "Calm your mind with simple breathing and thoughts.",
    icon: "🧘‍♀️",
    articles: [
      "Understanding Anxiety: Why It Happens",
      "5-Minute Breathing Exercises to Calm Down",
    ],
    tips: [
      "Take deep breaths for 4 seconds, hold for 4 seconds, exhale for 6 seconds.",
      "Limit caffeine intake.",
      "Write down your thoughts before sleeping.",
    ],
    quotes: [
      "You don’t have to control your thoughts. You just have to stop letting them control you.",
      "Breathe. You are stronger than you think.",
    ],
    activities: ["Try 1-Minute Reset", "Write in the Writing Space", "Listen to calm music"],
  },
  {
    id: 2,
    title: "Relationship / Breakup",
    description: "Heal from emotional pain and rediscover yourself.",
    icon: "💔",
    articles: [
      "Moving On After a Breakup",
      "How to Practice Self-Love Daily",
    ],
    tips: [
      "Allow yourself to grieve.",
      "Spend time with supportive friends.",
      "Focus on hobbies and learning new skills.",
    ],
    quotes: [
      "Sometimes good things fall apart so better things can fall together.",
      "Your heart will heal, and you will smile again.",
    ],
    activities: ["Time Capsule to Self", "Self-Love Affirmations", "Gratitude Journal"],
  },
  {
    id: 3,
    title: "Career & Study Pressure",
    description: "Stay focused without burning out.",
    icon: "📚",
    articles: [
      "Balancing Productivity & Rest",
      "Dealing with Academic Stress",
    ],
    tips: [
      "Break tasks into smaller parts.",
      "Take short breaks every 45 minutes.",
      "Celebrate small achievements.",
    ],
    quotes: [
      "Do what you can, with what you have, where you are.",
      "Your pace is perfect for your journey.",
    ],
    activities: ["Pomodoro Timer", "Mind Mapping", "Goal Tracker"],
  },
  {
    id: 4,
    title: "Loneliness",
    description: "Feel connected, even when alone.",
    icon: "🌙",
    articles: [
      "Making Peace with Alone Time",
      "Building Healthy Social Connections",
    ],
    tips: [
      "Call or message a friend.",
      "Join an online community.",
      "Do something creative.",
    ],
    quotes: [
      "You are never truly alone. The universe is within you.",
      "Solitude is where I place my chaos to rest.",
    ],
    activities: ["Anonymous Sharing Space", "Daily Gratitude", "Music Therapy"],
  },
];

const Issues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight + 20); // +20 for breathing room
    }
  }, []);

  return (
    <main className="issues-main" style={{ paddingTop: `${headerHeight}px` }}>
      <div className="issues-container">
        <h1 className="issues-title">What’s on your mind?</h1>
        <p className="issues-subtitle">
          Select an area and we’ll guide you with resources, activities, and support.
        </p>

        {!selectedIssue ? (
          <div className="issues-grid">
            {issuesData.map((issue) => (
              <div
                key={issue.id}
                className="issue-card"
                onClick={() => setSelectedIssue(issue)}
              >
                <div className="issue-icon">{issue.icon}</div>
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="issue-detail">
            <button className="back-btn" onClick={() => setSelectedIssue(null)}>
              ← Back to Categories
            </button>
            <h2>
              {selectedIssue.icon} {selectedIssue.title}
            </h2>
            <div className="detail-section">
              <h3>📄 Articles</h3>
              <ul>
                {selectedIssue.articles.map((art, i) => (
                  <li key={i}>{art}</li>
                ))}
              </ul>
            </div>
            <div className="detail-section">
              <h3>💡 Guidance & Tips</h3>
              <ul>
                {selectedIssue.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="detail-section">
              <h3>💬 Quotes</h3>
              {selectedIssue.quotes.map((quote, i) => (
                <blockquote key={i}>"{quote}"</blockquote>
              ))}
            </div>
            <div className="detail-section">
              <h3>🎯 Activities</h3>
              <ul>
                {selectedIssue.activities.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
            <div className="you-are-not-alone">
              <h4>🤝 You’re Not Alone</h4>
              <p>
                Many users visited this section this week — you’re part of a community that cares.
              </p>
            </div>
          </div>
        )}

        <div className="emergency-footer">
          <p>🚨 Need urgent help? Call: 9152987821 (AASRA Helpline India)</p>
          <p>🌍 International Helplines: https://findahelpline.com</p>
        </div>
      </div>
    </main>
  );
};

export default Issues;
