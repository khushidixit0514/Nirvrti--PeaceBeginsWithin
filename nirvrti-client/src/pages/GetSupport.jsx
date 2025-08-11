import React from "react";
import "./style.css";

const GetSupport = () => {
  return (
    <main className="support-container">
      <section className="support-section">
        <h1>Get Support</h1>
        <p>
          If you or someone you know is struggling with mental health challenges, reaching out for help is a brave and important step. Below are trusted resources, professional contacts, and helpline numbers to guide you through.
        </p>
      </section>

      <section className="support-section">
        <h2>Consult Licensed Mental Health Professionals</h2>
        <p>
          You can consult psychiatrists, psychologists, counselors, or clinical social workers. These professionals can provide diagnosis, therapy, medication, and ongoing support.  
          To find qualified mental health professionals near you, you can visit:
        </p>
        <ul>
          <li><a href="https://www.indianpsychiatricsociety.org" target="_blank" rel="noreferrer">Indian Psychiatric Society</a></li>
          <li><a href="https://www.nimhans.ac.in" target="_blank" rel="noreferrer">NIMHANS - National Institute of Mental Health and Neurosciences</a></li>
          <li><a href="https://www.telecounseling.com" target="_blank" rel="noreferrer">Tele-Counseling Services</a></li>
        </ul>
      </section>

      <section className="support-section">
        <h2>National Helplines and Emergency Contacts (India)</h2>
        <ul>
          <li><strong>Kiran Mental Health Helpline (24/7):</strong> 1800-599-0019</li>
          <li><strong>VISHWAS Helpline (For COVID-19 related mental health support):</strong> 9152987821</li>
          <li><strong>National Suicide Prevention Helpline:</strong> 9152987821</li>
          <li><strong>Emergency Number:</strong> 112</li>
          <li><strong>Roshni Helpline (Women’s mental health support):</strong> 022-2754 6669</li>
        </ul>
      </section>

      <section className="support-section">
        <h2>Trusted Mental Health Organizations</h2>
        <ul>
          <li><a href="https://www.sangath.in" target="_blank" rel="noreferrer">Sangath</a> – A leading NGO working on mental health in India.</li>
          <li><a href="https://www.mindsfoundation.org" target="_blank" rel="noreferrer">Minds Foundation</a> – Mental health awareness and support.</li>
          <li><a href="https://www.thehopeline.org" target="_blank" rel="noreferrer">The Hope Line India</a> – Confidential counseling and emotional support.</li>
        </ul>
      </section>

      <section className="support-section">
        <h2>Reach Out to Trusted People Around You</h2>
        <p>
          Sometimes talking to a close friend, family member, or mentor you trust can provide comfort and guidance.
          Don’t hesitate to share your feelings or ask for help.
        </p>
      </section>

      <section className="support-section">
        <h2>Online Support Groups and Communities</h2>
        <p>
          Joining support groups can help you feel connected and understood by others facing similar challenges.
          Many communities offer free, anonymous online support.
        </p>
        <ul>
          <li><a href="https://www.7cups.com" target="_blank" rel="noreferrer">7 Cups</a> – Online emotional support and counseling.</li>
          <li><a href="https://www.mentalhealthamerica.net" target="_blank" rel="noreferrer">Mental Health America</a> – Resources and community support.</li>
        </ul>
      </section>
    </main>
  );
};

export default GetSupport;
