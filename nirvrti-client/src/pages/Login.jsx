import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
     const res = await fetch(`${API_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

      const data = await res.json();

      if (res.ok) {
          localStorage.setItem('token', data.token); 
        navigate("/");
      } else {
        alert(data.message || "Login failed");
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

        .login-container {
          background: #fff;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          width: 350px;
          text-align: center;
        }

        .login-container h2 {
          margin-bottom: 20px;
          font-size: 28px;
          color: #4a007e;
        }

        .login-container input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: 0.3s;
        }

        .login-container input:focus {
          border-color: #4a007e;
          box-shadow: 0 0 8px rgba(74, 0, 126, 0.2);
        }

        .login-container button {
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

        .login-container button:hover {
          background-color: #6a1b9a;
        }

        .login-container a {
          display: block;
          margin-top: 15px;
          text-decoration: none;
          color: #4a007e;
          font-weight: bold;
        }

        .login-container a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-container">
        <h2>Login to Nirvrti</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">Don't have an account? Signup</Link>
      </div>
    </>
  );
};

export default Login;
