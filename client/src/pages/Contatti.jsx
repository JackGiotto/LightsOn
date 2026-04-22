import { NavBar } from "../Components/NavBar";
import styles from "../Style/layout.module.css";



export const Contatti = () => {

    return (
            <div className={styles.container}>
                <div className={styles.first}>
                    <NavBar></NavBar>
                </div>
                <div className={styles.second}>
                    Contatti
                </div>
            </div>
    );
}