import React from "react";
import styles from "../style/navbar.module.css"
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
                    <Link to="/contacts"><li className={styles.navElement}><a>Contatti</a></li></Link>
                </ul>
            
                <div  className={styles.hamburger}>
                    <Hamburger toggled={isOpen} toggle={setOpen}  />
                </div>

                
            </header>


            <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
                            
                    <ul>
                        <Link to="/dashboard" onClick={() => {setOpen(!isOpen)}}><li className={styles.category}>Dashboard</li></Link>

                                <Link to="/dashboard/lampioni" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Stato lampioni</li></Link>
                                <Link to="/dashboard/weeks" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Analizza settimane</li></Link>
                                <Link to="/dashboard/stagioni" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Analizza stagioni</li></Link>
                                <Link to="/dashboard/avg-age" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Età media</li></Link>
                                <Link to="/dashboard/consumes" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Consumi</li></Link>
                                <Link to="/dashboard/dashboardMap" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Analizza dalla mappa</li></Link>
                                <Link to="/dashboard/reports" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Segnalazioni</li></Link>

                                <Link to="/settings" onClick={() => {setOpen(!isOpen)}}><li className={styles.category}>Impostazioni</li></Link>
                        
                                <Link to="/settings/settings1" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Account</li></Link>
                                <Link to="/settings/settings2" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Preferenze</li></Link>

                                <Link to="/contacts" onClick={() => {setOpen(!isOpen)}}><li className={styles.category}>Contatti</li></Link>

                    </ul>
                        
                </div>

             
        </>
    );
}