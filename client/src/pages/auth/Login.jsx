import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import { Info, CreditCard, Eye, EyeOff } from 'lucide-react';
import styles from "../../style/auth/Login.module.css";



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { user, loading, setUser } = useContext(AuthContext);

    useEffect(() => {
      if (!loading && user) {
        if (user.role === 'admin') {
          navigate("/dashboard");
        } else {
          navigate("/citizen");
        }
      }
    }, [user, loading, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');

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

          const data = await response.json();

          if (!response.ok) {
            setErrorMsg(data.msg || "Login fallito");
            return;
          }

          setUser({ role: data.role });

          if (data.role === 'admin') {
            navigate("/dashboard");
          } else {
            navigate("/citizen");
          }
        } catch (error) {
          console.error(error);
          setErrorMsg("Errore di connessione, riprova.");
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

                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

                <button type="submit" className={`${styles.btn} ${styles.btnLogin}`}>Accedi</button>


          <div className={styles.signupLinkContainer}>
            <button className={styles.signupLink} onClick={() => navigate("/signup")}>Registrati</button>
          </div>

            <div className={styles.signupLinkContainer}>
            <button className={styles.signupLink} onClick={() => navigate("/")}>Torna alla home</button>
          </div>


        </form>
        {/*
        Buttons
        <div className={styles.buttonContainer}>
           SPID Button
          <button className={`${styles.btn} ${styles.btnSpid}`} onClick={() => alert('SPID in Arrivo!!')}>
            <div className={styles.iconCircle}>
              <Info size={16} color="#2563eb" />
            </div>
            Entra con SPID
          </button>

          /* CIE Button
          <button className={`${styles.btn} ${styles.btnCie}`} onClick={() => alert('Cie in Arrivo!!')}>
            <div className={styles.iconCircle}>
              <CreditCard size={16} color="#3b82f6" />
            </div>
            Entra con CIE
          </button>
          *

        </div>
    /*}

        {/* Footer */}
        <div className={styles.footer}>
          <p>Comune di Trento</p>
          <p>LightsOn® - 2026</p>
        </div>
    </div>
  );
}