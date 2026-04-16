import React from "react";
import styles from "../Style/maincontent.module.css"
import { Outlet } from "react-router";


export const MainContent = () => {

    return (
        <div className={styles.container}>
            <Outlet></Outlet>
        </div>
    );
}