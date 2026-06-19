import React, {useState} from "react";
import { Info, CreditCard, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import styles from "../../style/auth/SignUp.module.css";

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
    <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          {/* Logo */}
          <h1 className={styles.logo}>LightsOn</h1>
        </div>

        <form onSubmit={handleSignup} className={styles.formContainer}>
                    <input
                    className={styles.inputField}
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Nome"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                    />
                    <input
                    className={styles.inputField}
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Cognome"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                    />
                    <input
                    className={styles.inputField}
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <div className={styles.passwordWrapper}>
                      <input 
                      type={showPassword ? "text" : "password"}
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
                    {password.length > 0 && (
                      <ul className={styles.listRequi}>
                        <li className={`${styles.requirements} ${checksPwd.length ? styles.borderInputValid : styles.inputInvalid}`}>
                          Almeno 8 caratteri
                        </li>
                        <li className={`${styles.requirements} ${checksPwd.upperCase ? styles.borderInputValid : styles.inputInvalid}`}>
                           Almeno una lettera maiuscola
                        </li>
                        <li className={`${styles.requirements} ${checksPwd.numbr ? styles.borderInputValid : styles.inputInvalid}`}>
                          Almeno un numero
                        </li>
                        <li className={`${styles.requirements} ${checksPwd.special ? styles.borderInputValid : styles.inputInvalid}`}>
                          Almeno un carattere speciali (!@#$...)
                        </li>
                      </ul>
                    )}

                  <div className={styles.passwordWrapper}>
                    <input
                    type={showPasswordConf ? "text" : "password"}
                    className={`${styles.inputField} ${checksPwd.length > 0 ? (passwordCombacia ? 'styles.borderInputValid' : 'styles.borderInputInvalid') : ''}`} 
                    placeholder="Confirm password"
                    value={passwordConf}
                    onChange={(e) => setPasswordConf(e.target.value)}
                    required
                    />
                    <button 
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPasswordConf(!showPasswordConf)}
                    aria-label="Mostra/Nascondi password"
                    >
                    {showPasswordConf ? <EyeOff size={20} /> : <Eye size={20} />}  
                    </button>
                  </div>

                <button className={`${styles.btn} ${styles.btnLogin}`}>Registrati</button>
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

          {/* Login Link */}
          <div className={styles.signupLinkContainer}>
            <button className={styles.signupLink} onClick={() => navigate("/login")}>Torna al login</button>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>Comune di Trento</p>
          <p>LightsOn® - 2025</p>
        </div>
      </div>
  );
}
