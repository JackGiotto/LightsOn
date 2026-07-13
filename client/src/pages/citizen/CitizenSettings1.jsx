import React, { useContext, useEffect } from "react";
import styles from "../../style/settings1.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext.jsx";

function ChangePassword({ setShowOverview }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_BACKEND_URL;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("Le password non coincidono!");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/settings/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        alert("Password cambiata con successo!");
        setShowOverview(false);
      } else {
        const data = await response.json();
        alert(data.msg || "Errore durante il cambio password");
      }
    } catch (error) {
      console.error(error);
      alert("Errore di connessione");
    }
  };

  return (
    <div className={styles.overview}>
      <img
        className={styles.close}
        src="/close.png"
        width={15}
        onClick={() => setShowOverview(false)}
        alt="close"
      />
      <h3>Inserisci una nuova password:</h3>
      <form className={styles.changeForm} onSubmit={handleChangePassword}>
        <input
          placeholder="Nuova Password"
          className={styles.changeField}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          placeholder="Conferma Password"
          className={styles.changeField}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.confirmationButton}>
          Salva
        </button>
      </form>
    </div>
  );
}

function ChangeEmail({ setShowOverview }) {
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_BACKEND_URL;

  const handleChangeEmail = async (e) => {
    e.preventDefault();

    if (newEmail !== confirmNewEmail) {
      alert("Le email non coincidono!");
      return;
    }

    if (!newEmail.includes("@")) {
      alert("Inserisci un'email valida!");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/settings/email`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: newEmail }),
      });

      if (response.ok) {
        alert("Email cambiata con successo!");
        setShowOverview(false);
        window.location.reload(); // Ricarica per mostrare la nuova email
      } else {
        const data = await response.json();
        alert(data.msg || "Errore durante il cambio email");
      }
    } catch (error) {
      console.error(error);
      alert("Errore di connessione");
    }
  };

  return (
    <div className={styles.overview}>
      <img
        className={styles.close}
        src="/close.png"
        width={15}
        onClick={() => setShowOverview(false)}
        alt="close"
      />
      <h3>Inserisci una nuova mail:</h3>
      {(newEmail !== confirmNewEmail || !newEmail.includes("@") || !confirmNewEmail.includes("@")) && (
        <p>Ricontrolla!</p>
      )}
      <form className={styles.changeForm} onSubmit={handleChangeEmail}>
        <input
          placeholder="Nuova email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className={styles.changeField}
          type="email"
          required
        />
        <input
          placeholder="Conferma email"
          value={confirmNewEmail}
          onChange={(e) => setConfirmNewEmail(e.target.value)}
          className={styles.changeField}
          type="email"
          required
        />
        <button type="submit" className={styles.confirmationButton}>
          Salva
        </button>
      </form>
    </div>
  );
}

function DeleteAccount({ setShowOverview }) {
  const apiUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    if (window.confirm("Sei sicuro di voler eliminare definitivamente il tuo account? Questa azione è irreversibile!")) {
      try {
        const response = await fetch(`${apiUrl}/settings/delete`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          alert("Account eliminato con successo");
          setUser(null);
          navigate("/login", { replace: true });
        } else {
          const data = await response.json();
          alert(data.msg || "Errore durante l'eliminazione");
        }
      } catch (error) {
        console.error(error);
        alert("Errore di connessione");
      }
    }
  };

  return (
    <div className={styles.overview}>
      <img
        className={styles.close}
        src="/close.png"
        width={15}
        onClick={() => setShowOverview(false)}
        alt="close"
      />
      <h3>Sei sicuro di voler eliminare il tuo Account?</h3>
      <button
        className={`${styles.confirmationButton} ${styles.deleteButton}`}
        onClick={handleDeleteAccount}
      >
        Elimina
      </button>
    </div>
  );
}

export const CitizenSettings1 = () => {
  const apiUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [showPasswordPage, setPasswordPage] = useState(false);
  const [showEmailPage, setEmailPage] = useState(false);
  const [showAccountPage, setAccountPage] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/settings/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Impossibile caricare i dati utente");
        }

        const data = await response.json();
        setEmail(data.email || "");
        setName(data.profile?.firstName || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  const handleLogout = async () => {
    try {
      await fetch(`${apiUrl}/settings/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ciao {name || "utente"}</h1>
      <ul>
        <li>
          Registered email: {email || "--"}
          <button onClick={() => setEmailPage(!showEmailPage)}>
            Cambia email
          </button>
        </li>
        <li>
          Password: *******
          <button onClick={() => setPasswordPage(!showPasswordPage)}>
            Cambia password
          </button>
        </li>
        <li>
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        </li>
        <li>
          <button
            className={styles.deleteAccount}
            onClick={() => setAccountPage(!showAccountPage)}
          >
            Elimina Account
          </button>
        </li>
      </ul>

      {showPasswordPage && (
        <ChangePassword setShowOverview={setPasswordPage} />
      )}

      {showEmailPage && (
        <ChangeEmail setShowOverview={setEmailPage} />
      )}

      {showAccountPage && (
        <DeleteAccount setShowOverview={setAccountPage} />
      )}
    </div>
  );
};