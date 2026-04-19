import React from "react";
import styles from "../Style/imp1.module.css";

export const Imp1 = () => {
    return (
            <div className={styles.container}>
            <h1 className={styles.title}>Impostazioni Account</h1>
                <ul>
                    <li>Email registrata: ciao@pippo.com</li>
                    <button>Cambia mail</button>
                    <li>Cambia Password</li>
                    <li><button>Logout</button></li>
                    <li><button>Elimina Account</button></li>
                </ul>
            </div>
    )
}