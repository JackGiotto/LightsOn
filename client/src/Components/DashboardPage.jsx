import React from "react";
import { MainContent } from "./MainContent";
import styles from "../Style/page.module.css"
import { Outlet } from "react-router";
import { DashboardSideBar } from "./DashboardSideBar";


export const DashboardPage = () => {

    return (
        <div className={styles.container}>
            <DashboardSideBar></DashboardSideBar>
            <MainContent>
                <Outlet></Outlet>
            </MainContent>
        </div>
    );
}