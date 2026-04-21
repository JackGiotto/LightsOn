import React from "react";
import styles from "../Style/sidebar.module.css";
import { Link } from "react-router";

export const DashboardSideBar = () => {



    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Opzioni</h1>
            <ul className={styles.sidebarList}>
                <Link to="/dashboard/settimane"><li><h3>Analizza Settimane</h3></li></Link>
                <Link to="/dashboard/stagioni"><li><h3>Analizza Stagioni</h3></li></Link>
                <Link to="/dashboard/"><li><h3>Stato Lampioni</h3></li></Link>
                <Link to="/dashboard/"><li><h3>Età Media</h3></li></Link>
                <Link to="/dashboard/"><li><h3>Simulazione Consumi</h3></li></Link>
                <Link to="/dashboard/"><li><h3>Analizza dalla Mappa</h3></li></Link>
                <Link to="/dashboard/"><li><h3>Controllo Segnalazioni</h3></li></Link>
            </ul>
            <footer>
                <p>Comune di Trento<br></br>LightsOn© - 2026</p>
            </footer>
        </div>
    )
}