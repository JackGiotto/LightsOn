import { CitizenNavBar } from "./CitizenNavBar";
import styles from "../../style/layout.module.css";



export const CitizenContacts = () => {

    return (
            <div className={styles.container}>
                <div className={styles.first}>
                    <CitizenNavBar></CitizenNavBar>
                </div>
                <div className={styles.second}>
                    Contacts
                </div>
            </div>
    );
}