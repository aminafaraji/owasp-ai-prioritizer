import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from './login.jpg'

function Login({ onLogin }) {
  // États pour l'email et le mot de passe
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

   // Hook de React Router
   const navigate = useNavigate();

  // Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // vérification (à titre d'exemple)
    if (username === "admin" && password === "admin") {
      onLogin(true);
       // Redirection
    navigate('/'); // ou la route que tu veux
    } else {
      setError("Identifiant ou mot de passe invalide.");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Se connecter</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
