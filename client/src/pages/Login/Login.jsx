import React, {useState} from "react";
import { Info, CreditCard, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error('Login failed');
          } else {
            const data = await response.json();
            console.log('Login successful:', data);
            if (data.role === 'user') {
              // TODO: Handle user role specific logic
            } else if (data.role === 'admin') {
              // TODO: Handle admin role specific logic
            }
          }
        } catch (error) {
          console.error(error);
        }
    };

    return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="header">
          {/* Logo */}
          <h1 className="logo">LightsOn</h1>
        </div>

        <form onSubmit={handleLogin}>
            <div className="login-contatiner">
                <div className="input-container">
                    <input
                      className="input-field"
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="password-wrapper">
                        <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="input-field" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <button 
                          type="button"
                          className="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Mostra/Nascondi password"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-login">Login</button>
            </div>
        </form>
        {/* Buttons */}
        <div className="button-container">
          {/* SPID Button */}
          <button className="btn btn-spid" onClick={() => alert('SPID in Arrivo!!')}>
            <div className="icon-circle">
              <Info size={16} color="#2563eb" />
            </div>
            Entra con SPID
          </button>

          {/* CIE Button */}
          <button className="btn btn-cie" onClick={() => alert('Cie in Arrivo!!')}>
            <div className="icon-circle">
              <CreditCard size={16} color="#3b82f6" />
            </div>
            Entra con CIE
          </button>

          {/* Sign up button */}
          <div className="signup-link-container">
            <button className="signup-link" onClick={() => navigate("/SignUp")}>Sign up</button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Comune di Trento</p>
          <p>LightsOn® - 2025</p>
        </div>
      </div>
    </div>
  );
}
