import { CitizenNavBar } from "../../components/citizen/CitizenNavBar";
import styles from "../../style/citizen/citizenSettingsLayout.module.css";
import { Outlet } from "react-router";
import { CitizenSideBar } from "../../components/citizen/CitizenSideBar";
import { MainContent } from "../../components/MainContent";
import { Page } from "../../components/Page";



export const CitizenSettingsLayout = () => {

    return (
        <div className={styles.container}>
            <div className={styles.first}>
                <CitizenNavBar></CitizenNavBar>
            </div>
            <div className={styles.second}>
                <div className={styles.pageContainer}>
                            <CitizenSideBar></CitizenSideBar>
                            <MainContent>
                                <Outlet></Outlet>
                            </MainContent>
                </div>
            </div>
        </div>
    );
}