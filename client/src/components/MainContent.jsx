import React from "react";
import styles from "../style/maincontent.module.css"
import { Outlet } from "react-router";


export const MainContent = () => {

    return (
        <div className={styles.container}>
            <Outlet></Outlet>
        </div>
    );
}