import React from "react";
import { SideBar } from "./SideBar";
import { MainContent } from "./MainContent";
import styles from "../Style/page.module.css"
import { Outlet } from "react-router";


export const Page = () => {

    return (
        <div className={styles.container}>
            <SideBar></SideBar>
            <MainContent>
                <Outlet></Outlet>
            </MainContent>
        </div>
    );
}