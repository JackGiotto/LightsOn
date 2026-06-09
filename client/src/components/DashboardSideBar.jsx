import React from "react";
import styles from "../style/sidebar.module.css";
import { Link } from "react-router";

export const DashboardSideBar = () => {



    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Opzioni</h1>
            <ul className={styles.sidebarList}>
                <Link to="/dashboard/streetLamps"><li><h3>Stato lampioni</h3></li></Link>
                <Link to="/dashboard/weeks"><li><h3>Analisi settimane</h3></li></Link>
                <Link to="/dashboard/seasons"><li><h3>Analisi stagioni</h3></li></Link>
                <Link to="/dashboard/consumes"><li><h3>Consumi</h3></li></Link>
                <Link to="/dashboard/avg-age"><li><h3>Età media</h3></li></Link>
                <Link to="/dashboard/dashboardMap"><li><h3>Analisi da mappa</h3></li></Link>
                <Link to="/dashboard/reports"><li><h3>Segnalazioni</h3></li></Link>
            </ul>
            <footer>
                <p>Comune di Trento<br></br>LightsOn© - 2026</p>
            </footer>
        </div>
    )
}