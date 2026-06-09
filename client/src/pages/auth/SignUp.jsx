import React, {useState} from "react";
import { Info, CreditCard, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import "../../style/auth/SignUp.css";

export default function SignUp() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false);
    const navigate = useNavigate();

    const checksPwd = {
      length:  password.length >= 8,
      upperCase:  /[A-Z]/.test(password),
      numbr:     /[0-9]/.test(password),
      special:   /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    const passwordValida = Object.values(checksPwd).every(Boolean);
    const passwordCombacia = passwordConf.length > 0 && password === passwordConf;

    const handleSignup = async (e) => {
      e.preventDefault();

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
            firstName: fname,
            lastName: lname
          }),
        });

        if (!response.ok) {
          throw new Error('Signup failed');
        } else {
          const data = await response.json();
          console.log('Signup successful:', data);
          return data;
        }
      } catch (error) {
        console.error(error);
        return null;
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
                    placeholder="Nome"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                    />
                    <input
                    className="input-field"
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Cognome"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                    />
                    <input
                    className="input-field"
                    type="text"
                    id="email"
                    name="email"
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
                    {password.length > 0 && (
                      <ul className="list-requi">
                        <li className={`requirements ${checksPwd.length ? 'input-valid' : 'input-invalid'}`}>
                          Almeno 8 caratteri
                        </li>
                        <li className={`requirements ${checksPwd.upperCase ? 'input-valid' : 'input-invalid'}`}>
                           Almeno una lettera maiuscola
                        </li>
                        <li className={`requirements ${checksPwd.numbr ? 'input-valid' : 'input-invalid'}`}>
                          Almeno un numero
                        </li>
                        <li className={`requirements ${checksPwd.special ? 'input-valid' : 'input-invalid'}`}>
                          Almeno un carattere speciali (!@#$...)
                        </li>
                      </ul>
                    )}

                  <div className="password-wrapper">
                    <input
                    type={showPasswordConf ? "text" : "password"}
                    className={`input-field ${checksPwd.length > 0 ? (passwordCombacia ? 'border-input-valid' : 'border-input-invalid') : ''}`} 
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

                <button className="btn btn-login">Registrati</button>
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
            <button className="signup-link" onClick={() => navigate("/login")}>Torna al login</button>
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
