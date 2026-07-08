import React from "react";
import styles from "../../style/citizen/citizenSettings.module.css";
import { CitizenNavBar } from "../../components/citizen/CitizenNavBar";
import { Page } from "../../components/Page";
import { Outlet } from "react-router-dom";

export const CitizenSettings = () => {

    return (
        <div className={styles.container}>

            <div className={styles.first}>
                <CitizenNavBar></CitizenNavBar>
            </div>

            <div className={styles.second}>
                <Page>
                    <Outlet></Outlet>
                </Page>
            </div>

        </div>
    )
}