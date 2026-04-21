import React from "react";
import styles from "../Style/imp1.module.css";

export const Imp1 = () => {
    return (
            <div className={styles.container}>
            <h1 className={styles.title}>Impostazioni Account</h1>
                <ul>
                    <li>Email registrata: ciao@pippo.com<button>Cambia mail</button></li>
                    <li>Password: *******<button>Cambia Password</button></li>
                    <li><button>Logout</button></li>
                    <li><button className={styles.deleteAccount}>Elimina Account</button></li>
                </ul>
            </div>
    )
}