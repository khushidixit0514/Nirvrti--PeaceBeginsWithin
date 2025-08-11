import React, { useState, useEffect } from "react";
import "./style.css";

const affirmations = [
  "You are stronger than you think.",
  "Peace begins with a single breath.",
  "Let go of what you can't control.",
  "You deserve calm and happiness.",
  "Every day is a new beginning."
];

export default function MentalDetox() {
  const [mood, setMood] = useState("");
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showAffirmation, setShowAffirmation] = useState(false);

  const steps = [
    "Close your eyes and take deep breaths...",
    "Release all the tension from your body...",
      "Think of one thing you're truly grateful for and hold it in your mind..."
  ];

  const startDetox = () => {
    setStep(1);
    setTimeLeft(20);
  };

  useEffect(() => {
    if (step > 0 && step <= steps.length) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        if (step < steps.length) {
          setStep(step + 1);
          setTimeLeft(20);
        } else {
          setShowAffirmation(true);
        }
      }
    }
  }, [timeLeft, step]);

  return (
    <div className="mental-detox-container">
      <h1 className="detox-title">🧘 Mental Detox</h1>
      <p className="detox-subtitle">Clear your mind in just one minute</p>

      {!mood && (
        <div className="mood-selector">
          <h2>How are you feeling right now?</h2>
          <div className="mood-buttons">
            <button onClick={() => setMood("😊")}>😊 Happy</button>
            <button onClick={() => setMood("😔")}>😔 Sad</button>
            <button onClick={() => setMood("😡")}>😡 Angry</button>
            <button onClick={() => setMood("😌")}>😌 Calm</button>
          </div>
        </div>
      )}

      {mood && step === 0 && (
        <div className="start-section">
          <p>Your current mood: <span className="mood-display">{mood}</span></p>
          <button className="start-btn" onClick={startDetox}>
            Start 1-Minute Detox
          </button>
        </div>
      )}

      {step > 0 && step <= steps.length && (
        <div className="detox-step">
          <h2>Step {step} of {steps.length}</h2>
          <p>{steps[step - 1]}</p>
          <div className="breathing-circle"></div>
          <p className="timer">⏳ {timeLeft}s</p>
        </div>
      )}

      {showAffirmation && (
        <div className="affirmation-section">
          <h2>✨ Your Positive Affirmation ✨</h2>
          <p>{affirmations[Math.floor(Math.random() * affirmations.length)]}</p>
          <button
            className="home-btn"
            onClick={() => window.location.href = "/"}
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  );
}
