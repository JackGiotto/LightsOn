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
                <div className={styles.logo}  onClick={() => {setOpen(false)}}>
                    <Logo userType={"/citizen"}/>
                </div>
                <ul className={styles.navbarList}>
                    <Link to="/citizen/settings"><li className={styles.navElement}><a>Impostazioni</a></li></Link>
                    <Link to="/citizen/contacts"><li className={styles.navElement}><a>Contatti</a></li></Link>
                </ul>
            
                <div  className={styles.hamburger}>
                    <Hamburger toggled={isOpen} toggle={setOpen}  />
                </div>

                
            </header>


            <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
                            
                    <ul>

                        <Link to="/citizen/settings" onClick={() => {setOpen(!isOpen)}}><li className={styles.category}><h3>Impostazioni</h3></li></Link>
                        
                        <Link to="/citizen/settings/settings1" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Account</li></Link>
                        <Link to="/citizen/settings/settings2" onClick={() => {setOpen(!isOpen)}}><li className={styles.subcategory}>Preferenze</li></Link>

                        <Link to="/contacts"><li className={styles.category}><h3>Contatti</h3></li></Link>

                    </ul>
                        
                </div>

             
        </>
    );
}