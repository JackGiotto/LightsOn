import React, { useState } from "react";
import styles from "../Style/imp2.module.css";

export const Imp2 = () => {

    const [darkMode, setDarkMode] = useState(false);

    const changeMode = () => {
        setDarkMode(!darkMode);
    }


    return (
        <div className={styles.container}>
                    <h1 className={styles.title}>Preferenze</h1>
                        <ul>
                            <li>Modalità colore:   {darkMode ? "  Dark" : "  Light"}<button onClick={changeMode}>Cambia</button></li>
                        </ul>
                    </div>
    )
}