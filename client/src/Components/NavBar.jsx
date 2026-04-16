import React from "react";
import styles from "../Style/navbar.module.css"
import {Logo} from "./Logo.jsx"
import { Link } from "react-router";

export const NavBar = () => {

    return (
            <header className={styles.container}>
                <Logo></Logo>
                <ul className={styles.navbarList}>
                    <Link to="/dashboard"><li className={styles.navElement}><a>Dashboard</a></li></Link>
                    <Link to="/settings"><li className={styles.navElement}><a>Impostazioni</a></li></Link>
                    <Link to="/contatti"><li className={styles.navElement}><a>Contatti</a></li></Link>
                </ul>
            </header>
    );
}