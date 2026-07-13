import React, { Activity, useContext, useEffect } from "react";
import styles from "../style/settings1.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext.jsx";

function ChangePassword({setShowOverview})  {

  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`);
        console.log("ciao")
    } catch(error) {
        console.error(error);
    }
  }

  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h3>Inserisci una nuova password:</h3>
            <form className={styles.changeForm}>
                <input placeholder="Nuova Password" className={styles.changeField} type="password"></input>
                <input placeholder="Conferma Password" className={styles.changeField} type="password"></input>
                <button className={styles.confirmationButton}>Salva</button>
            </form>
          </div>
  )
}

function ChangeEmail({setShowOverview})  {
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");

  const handleChangeEmail = async () => {
    if (newEmail == confirmNewEmail) {


    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`);
        console.log("ciao")
    } catch(error) {
        console.error(error);
    }
    }
  }

  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h3>Inserisci una nuova mail:</h3>
            {(newEmail !== confirmNewEmail || !newEmail.includes("@") || !confirmNewEmail.includes("@")) && <p>Ricontrolla!</p>}
            <form className={styles.changeForm}>
              <input placeholder="Nuova email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} className={styles.changeField} type="email"></input>
              <input placeholder="Conferma email" value={confirmNewEmail} onChange={(event) => setConfirmNewEmail(event.target.value)} className={styles.changeField} type="email"></input>
              <button className={styles.confirmationButton}>Salva</button>
            </form>
          </div>
  )
}

function DeleteAccount({setShowOverview})  {

  const handleDeleteAccount = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`);
        console.log("ciao")
    } catch(error) {
        console.error(error);
    }
  }

  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h3>Sei sicuro di voler eliminare il tuo Account?</h3>
                <button className={`${styles.confirmationButton} ${styles.deleteButton}`}>Elimina</button>
          </div>
  )
}

export const Settings1 = () => {
  const apiUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);


    const [showPasswordPage, setPasswordPage] = useState(false);
    const [showEmailPage, setEmailPage] = useState(false);
    const [ showAccountPage, setAccountPage] = useState(false);


    const [email, SetEmail] = useState("");
    const [name, SetName] = useState("");


    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${apiUrl}/settings/me`, {
            credentials: "include"
          });

          if (!response.ok) {
            throw new Error("Impossibile caricare i dati utente");
          }

          const data = await response.json();
          SetEmail(data.email || "");
          SetName(data.profile?.firstName || "");
        } catch (error) {
          console.error(error);
        }
      }

      fetchUserData();
    }, []);

    const handleLogout = async () => {
      try {
        await fetch(`${apiUrl}/settings/logout`, {
          method: "POST",
          credentials: "include"
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
                  <li>Registered email: {email || "--"}<button onClick={() => setEmailPage(!showEmailPage)}>Cambia email</button></li>
                  <li>Password: *******<button onClick={() => setPasswordPage(!showPasswordPage)}>Cambia password</button></li>
                  <li><button type="button" onClick={handleLogout}>Log out</button></li>
                  <li><button className={styles.deleteAccount} onClick={() => setAccountPage(!showAccountPage)}>Elimina Account</button></li>
                </ul>

                <Activity mode={showPasswordPage ? "visible": "hidden"}>
                  <ChangePassword setShowOverview={setPasswordPage}></ChangePassword>
                </Activity>

                <Activity mode={showEmailPage ? "visible" : "hidden"}>
                  <ChangeEmail setShowOverview={setEmailPage} ></ChangeEmail>
                </Activity>

                <Activity mode={showAccountPage ? "visible" : "hidden"}>
                  <DeleteAccount setShowOverview={setAccountPage} ></DeleteAccount>
                </Activity>

            </div>
    )
}