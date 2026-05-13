import React, {useState} from "react";
import { Info, CreditCard, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import "./SignUp.css";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Signin:', { email, password });
        
        // Validazione semplice
        if (email === 'test@test.com' && password === 'password123') {
        alert('Login effettuato con successo!');
        // Qui poi farai il redirect alla dashboard
        } else {
            alert('Credenziali errate!');
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

        <form onSubmit={handleSignup}>
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
                    <div className="password-wrapper">
                      <input
                      type={showPasswordConf ? "text" : "password"}
                      className="input-field" 
                      placeholder="Confirm password"
                      value={passwordConf}
                      onChange={(e) => setPasswordConf(e.target.value)}
                      required
                      />
                      <button 
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPasswordConf(!showPasswordConf)}
                      aria-label="Mostra/Nascondi password"
                      >
                      {showPasswordConf ? <EyeOff size={20} /> : <Eye size={20} />}  
                      </button>
                    </div>
                </div>

                <button className="btn btn-login">Sign Up</button>
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

          {/* Login Link */}
          <div className="signup-link-container">
            <button className="signup-link" onClick={() => navigate("/Login")}>Return to login</button>
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
