import React, { Activity } from "react";
import styles from "../../style/settings1.module.css";
import { useState } from "react";

function ChangePassword({setShowOverview})  {
  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h3>Inserisci una nuova password:</h3>
            <form className={styles.changeForm}>
                <input placeholder="Nuova Password" className={styles.changeButton} type="password"></input>
                <input placeholder="Conferma Password" className={styles.changeButton} type="password"></input>
                <button className={styles.confirmationButton}>Salva</button>
            </form>
          </div>
  )
}

function ChangeEmail({setShowOverview})  {
  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h3>Inserisci una nuova mail:</h3>
            <form className={styles.changeForm}>
              <input placeholder="Nuova email" className={styles.changeButton} type="email"></input>
              <input placeholder="Conferma email" className={styles.changeButton} type="email"></input>
              <button className={styles.confirmationButton}>Salva</button>
            </form>
          </div>
  )
}

function DeleteAccount({setShowOverview})  {
  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h3>Sei sicuro di voler eliminare il tuo Account?</h3>
                <button className={`${styles.confirmationButton} ${styles.deleteButton}`}>Elimina</button>
          </div>
  )
}

export const CitizenSettings1 = () => {


    const [showPasswordPage, setPasswordPage] = useState(false);
    const [showEmailPage, setEmailPage] = useState(false);
    const [ showAccountPage, setAccountPage] = useState(false);

    return (
            <div className={styles.container}>
                <h1 className={styles.title}>Hello Mario</h1>
                <ul>
                  <li>Registered email: ciao@pippo.com<button onClick={() => setEmailPage(!showEmailPage)}>Cambia email</button></li>
                  <li>Password: *******<button onClick={() => setPasswordPage(!showPasswordPage)}>Cambia password</button></li>
                  <li><button>Log out</button></li>
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