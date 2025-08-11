import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const steps = [
  {
    title: "Deep Breathing",
    text: "Inhale deeply through your nose… hold… and exhale slowly.",
  },
  {
    title: "Gratitude Moment",
    text: "Think of one thing you're grateful for today.",
  },
  {
    title: "Stretch & Posture Check",
    text: "Roll your shoulders back, stretch your neck, and sit tall.",
  },
  {
    title: "Positive Affirmation",
    text: "You are capable, strong, and ready for anything ahead.",
  },
];

const affirmations = [
  "I am in control of my thoughts and emotions.",
  "Every day is a new chance to grow.",
  "I choose peace over worry.",
  "I am proud of how far I’ve come.",
  "Gratitude is my daily choice.",
];

export default function Reset() {
  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [feelingBefore, setFeelingBefore] = useState(null);
  const [feelingAfter, setFeelingAfter] = useState(null);
  const audioRef = useRef(new Audio("/calm-music.mp3"));

  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft % 15 === 0 && timeLeft !== 60) {
          setStepIndex((prev) => prev + 1);
        }
      }, 1000);
    }
    if (timeLeft === 0) {
      setRunning(false);
      setStepIndex(steps.length - 1);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, running]);

  const startReset = () => {
    setRunning(true);
    setStepIndex(0);
    setTimeLeft(60);
  };

  const toggleMusic = () => {
    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicOn(!musicOn);
  };

  const progressPercent = ((60 - timeLeft) / 60) * 100;

  return (
    <div className="reset-container">
      <h1 className="reset-title">1-Minute Reset</h1>

      {!running && (
        <div className="feeling-section">
          <p>How do you feel right now?</p>
          <div className="emoji-options">
            <span onClick={() => setFeelingBefore("😔")}>😔</span>
            <span onClick={() => setFeelingBefore("😐")}>😐</span>
            <span onClick={() => setFeelingBefore("😊")}>😊</span>
          </div>
        </div>
      )}

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="reset-step">
        <h2>{steps[stepIndex]?.title}</h2>
        <p>{stepIndex === 3 ? affirmations[Math.floor(Math.random() * affirmations.length)] : steps[stepIndex]?.text}</p>
        <p className="timer">{timeLeft}s</p>
      </div>

      <div className="reset-controls">
        {!running ? (
          <button onClick={startReset} className="start-btn">Start Reset</button>
        ) : (
          <button onClick={toggleMusic} className="music-btn">
            {musicOn ? "Stop Music" : "Play Music"}
          </button>
        )}
      </div>

      {!running && feelingBefore && (
        <div className="feeling-section">
          <p>How do you feel now?</p>
          <div className="emoji-options">
            <span onClick={() => setFeelingAfter("😔")}>😔</span>
            <span onClick={() => setFeelingAfter("😐")}>😐</span>
            <span onClick={() => setFeelingAfter("😊")}>😊</span>
          </div>
        </div>
      )}
    </div>
  );
}
