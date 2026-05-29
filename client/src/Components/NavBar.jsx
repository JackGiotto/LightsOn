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
                            <Link to="/dashboard" onClick={() => {setOpen(!isOpen)}}><li className={styles.category}>Dashboard</li></Link>

                        <Link to="/dashboard/lampioni" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Stato lampioni</li></Link>
                        <Link to="/dashboard/settimane" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Analizza Settimane</li></Link>
                        <Link to="/dashboard/stagioni" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Analizza Stagioni</li></Link>
                        <Link to="/dashboard/eta-media" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Età Media</li></Link>
                        <Link to="/dashboard/consumi" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Simulazione Consumi</li></Link>
                        <Link to="/dashboard/mappa" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Analizza dalla Mappa</li></Link>
                        <Link to="/dashboard/segnalazioni" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Controllo Segnalazioni</li></Link>

                        <Link to="/settings" onClick={() => {setOpen(!isOpen)}}><li className={styles.category}>Impostazioni</li></Link>
                        
                        <Link to="/settings/settings1" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Impostazioni Account</li></Link>
                        <Link to="/settings/settings2" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Preferenze</li></Link>

                        <Link to="/contatti" onClick={() => {setOpen(!isOpen)}}><li className={styles.category}>Contatti</li></Link>

                    </ul>
                        
                </div>

             
        </>
    );
}