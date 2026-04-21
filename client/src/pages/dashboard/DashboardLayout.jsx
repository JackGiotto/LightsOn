
import { Outlet } from "react-router";
import { NavBar } from "../../Components/NavBar";
import styles from "../../Style/layout.module.css";
import { DashboardPage } from "../../Components/DashboardPage";



export const DashboardLayout = () => {

    return (
            <div className={styles.container}>
                <div className={styles.first}>
                    <NavBar></NavBar>
                </div>
                <div className={styles.second}>
                    <DashboardPage>
                        <Outlet></Outlet>
                    </DashboardPage>
                </div>
            </div>
    );
}