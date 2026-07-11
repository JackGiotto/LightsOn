import React from "react";
import styles from "../../style/navbar.module.css"
import {Logo} from "../../components/Logo"
import { Link } from "react-router";
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from "react";

export const CitizenNavBar = () => {

    const [isOpen, setOpen] = useState(false)

    

    return (
        <>
           
            <header className={styles.container}>
                <div className={styles.logo}>
                    <Logo userType={"/citizen"} />
                </div>
                <ul className={styles.navbarList}>
                    <li className={styles.navElement}><Link to="/citizen/settings">Impostazioni</Link></li>
                    <li className={styles.navElement}><Link to="/citizen/contacts">Contatti</Link></li>
                </ul>
            
                <div  className={styles.hamburger}>
                    <Hamburger toggled={isOpen} toggle={setOpen}  />
                </div>

                
            </header>


            <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
                            
                    <ul>

                        <li className={styles.category}><Link to="/citizen/settings" onClick={() => {setOpen(!isOpen)}}><h3>Impostazioni</h3></Link></li>
                        
                        <li className={styles.subcategory}><Link to="/citizen/settings/settings1" onClick={() => {setOpen(!isOpen)}}>Account</Link></li>
                        <li className={styles.subcategory}><Link to="/citizen/settings/settings2" onClick={() => {setOpen(!isOpen)}}>Preferenze</Link></li>

                        <li className={styles.category}><Link to="/contacts"><h3>Contatti</h3></Link></li>

                        <li className={styles.subcategory}>Sottocategoria contatti</li>
                    </ul>
                        
                </div>

             
        </>
    );
}