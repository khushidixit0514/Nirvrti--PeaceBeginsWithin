import React from "react";
import "./style.css";

const AboutUs = () => {
  return (
    <main className="aboutus-container">
      <section className="aboutus-section">
        <h1>What is Nirvrti?</h1>
        <p>
          Nirvrti is a calm and compassionate space dedicated to mental wellness and inner peace. 
          It’s designed to help you reconnect with yourself through simple, effective tools like guided writing, mental detox exercises, 
          mindfulness resets, and supportive community features. In today’s fast-paced world, mental health can often take a backseat, 
          but Nirvrti reminds us that healing begins from within. Here, you can safely explore your emotions, find guidance, and take small 
          steps towards a healthier, happier mind every day.
        </p>
      </section>

      <section className="aboutus-section">
        <h2>Our Vision</h2>
        <p>
          Our vision is to create an inclusive and stigma-free environment where mental wellness is accessible to everyone, regardless of background 
          or circumstance. We believe that everyone deserves tools and support to navigate their mental health journey with dignity and hope. 
          Nirvrti aspires to be a trusted companion for self-discovery, resilience, and growth — inspiring individuals to cultivate peace within and 
          build a connected community of healing.
        </p>
      </section>

      <section className="aboutus-section about-me">
        <h2>About Me</h2>
        <p>
          Hi, I’m Khushi Dixit — the creator behind Nirvrti. As someone passionate about mental health awareness and healing, I built this platform 
          to share simple, supportive tools that helped me and many others in their personal journeys. Through Nirvrti, I hope to extend that support 
          to you, offering a gentle space to pause, reflect, and grow. Your mental peace matters, and you’re never alone here.
        </p>
      </section>
    </main>
  );
};

export default AboutUs;
