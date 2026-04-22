import { NavBar } from "./NavBar";
import { Page } from "./Page";
import styles from "../Style/layout.module.css";
import { Outlet } from "react-router";



export const Layout = () => {

    return (
        <div className={styles.container}>
            <div className={styles.first}>
                <NavBar></NavBar>
            </div>
            <div className={styles.second}>
                <Page>
                    <Outlet></Outlet>
                </Page>
            </div>
        </div>
    );
}