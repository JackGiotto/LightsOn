import React, { useState } from "react";
import styles from "../style/settings2.module.css";

export const Settings2 = () => {

    const [darkMode, setDarkMode] = useState(false);

    const changeMode = () => {
        setDarkMode(!darkMode);
    }


    return (
        <div className={styles.container}>
                    <h1 className={styles.title}>Preferences</h1>
                        <ul>
                            <li>Color mode:   {darkMode ? "  Dark" : "  Light"}<button onClick={changeMode}>Change</button></li>
                        </ul>
                    </div>
    )
}