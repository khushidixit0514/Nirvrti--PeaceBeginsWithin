import React, { useState } from 'react';

function Pledge() {
  const [checkedItems, setCheckedItems] = useState({
    selfCare: false,
    speakUp: false,
    stayPositive: false,
    seekHelp: false,
    dailySteps: false,
  });

  const handleChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = () => {
    const allChecked = Object.values(checkedItems).every(Boolean);
    if (allChecked) {
      alert("You've successfully pledged to heal 💖");
        window.location.href = "/#feature"; 
      
    } else {
      alert("Please check all points to complete your pledge.");
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🌿 I Pledge to Heal</h1>
        <p style={styles.subheading}>Make a commitment to yourself to begin your healing journey.</p>

        <form style={styles.form}>
          <label style={styles.checkbox}>
            <input type="checkbox" name="selfCare" onChange={handleChange} />
            I will prioritize my self-care.
          </label>

          <label style={styles.checkbox}>
            <input type="checkbox" name="speakUp" onChange={handleChange} />
            I will not stay silent about my struggles.
          </label>

          <label style={styles.checkbox}>
            <input type="checkbox" name="stayPositive" onChange={handleChange} />
            I will try to stay positive even on tough days.
          </label>

          <label style={styles.checkbox}>
            <input type="checkbox" name="seekHelp" onChange={handleChange} />
            I will reach out when I need support.
          </label>

          <label style={styles.checkbox}>
            <input type="checkbox" name="dailySteps" onChange={handleChange} />
            I will take small steps daily toward healing.
          </label>

          <button type="button" onClick={handleSubmit} style={styles.button}>
            I Pledge to Heal ✨
          </button>
        </form>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#f3f4f6',
    padding: '40px 20px',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '28px',
  },
  subheading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '16px',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  checkbox: {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Pledge;
