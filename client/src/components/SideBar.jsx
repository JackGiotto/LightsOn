import React from "react";
import styles from "../style/sidebar.module.css";
import { Link } from "react-router";

export const SideBar = () => {



    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Impostazioni</h1>
            <ul className={styles.sidebarList}>
                <Link to="/settings/settings1"><li><h3>Account</h3></li></Link>
                <Link to="/settings/settings2"><li><h3>Preferenze</h3></li></Link>
            </ul>
            <footer>
                <p>Comune di Trento<br></br>LightsOn© - 2026</p>
            </footer>
        </div>
    )
}