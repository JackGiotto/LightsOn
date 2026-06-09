
import { Outlet } from "react-router";
import { NavBar } from "../../components/NavBar";
import styles from "../../style/layout.module.css";
import { DashboardPage } from "../../components/DashboardPage";



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