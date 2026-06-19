import React, {useState} from "react";
import { Info, CreditCard, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import styles from "../../style/auth/Login.module.css";

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
    <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          {/* Logo */}
          <h1 className={styles.logo}>LightsOn</h1>
        </div>

        <form onSubmit={handleLogin} className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <input
                      className={styles.inputField}
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className={styles.passwordWrapper}>
                        <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={styles.inputField}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <button 
                          type="button"
                          className={styles.togglePassword}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Mostra/Nascondi password"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <button type="submit" className={`${styles.btn} ${styles.btnLogin}`}>Accedi</button>
        </form>
        {/* Buttons */}
        <div className={styles.buttonContainer}>
          {/* SPID Button */}
          <button className={`${styles.btn} ${styles.btnSpid}`} onClick={() => alert('SPID in Arrivo!!')}>
            <div className={styles.iconCircle}>
              <Info size={16} color="#2563eb" />
            </div>
            Entra con SPID
          </button>

          {/* CIE Button */}
          <button className={`${styles.btn} ${styles.btnCie}`} onClick={() => alert('Cie in Arrivo!!')}>
            <div className={styles.iconCircle}>
              <CreditCard size={16} color="#3b82f6" />
            </div>
            Entra con CIE
          </button>

          {/* Sign up button */}
        </div>
        
          <div className={styles.signupLinkContainer}>
            <button className={styles.signupLink} onClick={() => navigate("/signup")}>Registrati</button>
          </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>Comune di Trento</p>
          <p>LightsOn® - 2026</p>
        </div>
    </div>
  );
}
