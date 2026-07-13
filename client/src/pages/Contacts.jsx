import { NavBar } from "../components/NavBar";
import styles from "../style/layout.module.css";



export const Contacts = () => {

    return (
            <div className={styles.container}>
                <div className={styles.first}>
                    <NavBar></NavBar>
                </div>
                <div className={styles.second}>
                    Contacts
                </div>
            </div>
    );
}