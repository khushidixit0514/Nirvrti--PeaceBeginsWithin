import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right, #e0c3fc, #8ec5fc);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .signup-container {
          background: #fff;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          width: 350px;
          text-align: center;
        }

        .signup-container h2 {
          margin-bottom: 20px;
          font-size: 28px;
          color: #4a007e;
        }

        .signup-container input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: 0.3s;
        }

        .signup-container input:focus {
          border-color: #4a007e;
          box-shadow: 0 0 8px rgba(74, 0, 126, 0.2);
        }

        .signup-container button {
          width: 100%;
          padding: 12px;
          border: none;
          background-color: #4a007e;
          color: white;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .signup-container button:hover {
          background-color: #6a1b9a;
        }

        .signup-container a {
          display: block;
          margin-top: 15px;
          text-decoration: none;
          color: #4a007e;
          font-weight: bold;
        }

        .signup-container a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="signup-container">
        <h2>Signup for Nirvrti</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </>
  );
};

export default Signup;
