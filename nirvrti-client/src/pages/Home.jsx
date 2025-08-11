import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/bgimg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div className="hero-content">
         <div className="no-space-headings">
  <h1>NIRVRTI</h1>
  <h2>'Peace Begins Within'</h2><br></br>
</div>

          <p>
            Healing begins with a single step — a moment of silence, a breath of
            courage, and the will to begin again.
          </p>
          <Link to="/pledge" className="btn">
            Take a Pledge
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="feature">
        <div className="section-title">
          <h2>Begin Your Healing Journey</h2>
          <p>
            Explore tools, tips, and techniques to ease your mind and reconnect
            with yourself.
          </p>
        </div>

        <div className="features-grid">
          <Link to="/write" className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Writing Space</h3>
            <p>
              Unlock your thoughts and emotions through guided journaling
              prompts and free expression.
            </p>
          </Link>

          <Link to="/detox" className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Mental Detox</h3>
            <p>
              Release mental clutter with focused exercises designed to clear
              and refresh your mind.
            </p>
          </Link>

          <Link to="/reset" className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>1-Minute Reset</h3>
            <p>
              Quick interventions to bring you back to center when you need it
              most.
            </p>
          </Link>

          <Link to="/capsule" className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Time Capsule</h3>
            <p>
              Preserve meaningful moments and reflections to revisit in the
              future.
            </p>
          </Link>

          <Link to="/issues" className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Community Support</h3>
            <p>
              Connect with others on similar journeys in a safe, supportive
              space.
            </p>
          </Link>

    
          <Link to="/stories" className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Stories from the Heart</h3>
            <p>
              Read real stories from people who’ve been where you are — and
              share your own journey.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
