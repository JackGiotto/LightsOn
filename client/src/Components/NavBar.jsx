import React from "react";
import styles from "../Style/navbar.module.css"
import {Logo} from "./Logo.jsx"
import { Link } from "react-router";
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from "react";

export const NavBar = () => {

    const [isOpen, setOpen] = useState(false)

    

    return (
        <>
           
            <header className={styles.container}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <ul className={styles.navbarList}>
                    <Link to="/dashboard"><li className={styles.navElement}><a>Dashboard</a></li></Link>
                    <Link to="/settings"><li className={styles.navElement}><a>Impostazioni</a></li></Link>
                    <Link to="/contatti"><li className={styles.navElement}><a>Contatti</a></li></Link>
                </ul>
            
                <div  className={styles.hamburger}>
                    <Hamburger toggled={isOpen} toggle={setOpen}  />
                </div>

                
            </header>


            <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
                            
                    <ul>
                            <Link to="/dashboard"><li className={styles.category}><h3>Dashboard</h3></li></Link>

                        <Link to="/dashboard/settimane"><li className={styles.subcategory}>Analizza Settimane</li></Link>
                        <Link to="/dashboard/stagioni"><li className={styles.subcategory}>Analizza Stagioni</li></Link>
                        <li className={styles.subcategory}>Stato lampioni</li>
                        <li className={styles.subcategory}>Età Media</li>
                        <li className={styles.subcategory}>Simulazione Consumi</li>
                        <li className={styles.subcategory}>Analizza dalla Mappa</li>
                        <li className={styles.subcategory}>Controllo Segnalazioni</li>

                        <Link to="/settings" onClick={() => {setOpen(!isOpen)}}><li className={styles.category}><h3>Impostazioni</h3></li></Link>
                        
                        <Link to="/settings/settings1" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Impostazioni Account</li></Link>
                        <Link to="/settings/settings2" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Preferenze</li></Link>

                        <Link to="/contatti"><li className={styles.category}><h3>Contatti</h3></li></Link>

                        <li className={styles.subcategory}>Sottocategoria Contatti</li>
                    </ul>
                        
                </div>

             
        </>
    );
}