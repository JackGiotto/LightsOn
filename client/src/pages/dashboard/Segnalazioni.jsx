import React from "react";
import styles from"../../Style/dashboard/segnalazioni.module.css";

export const Segnalazioni = () => {

  const handleCall = () => {
    window.location.href = 'tel:+1234567890';
  };
    return (
        <div className={styles.container}>
            <h1>Controllo Segnalazioni</h1>
            <ul className={styles.reportList}>
                <li>
                <div className={styles.section}>
                    
                    <p>18/04/2026</p>
                    <p>Lampione 42</p>
                    <p>Produttore<br></br>Daniel Lights</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>3 upvote</p>
                    </div>
                </li>

                <li>
                <div className={styles.section}>
                    
                    <p>21/04/2026</p>
                    <p>Lampione 23</p>
                    <p>Produttore<br></br>Quei Ragazzi Inc.</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>1 upvote</p>
                    </div>
                </li>
                <li>
                <div className={styles.section}>
                    
                    <p>18/04/2026</p>
                    <p>Lampione 42</p>
                    <p>Produttore<br></br>Daniel Lights</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>3 upvote</p>
                    </div>
                </li>

                <li>
                <div className={styles.section}>
                    
                    <p>21/04/2026</p>
                    <p>Lampione 23</p>
                    <p>Produttore<br></br>Quei Ragazzi Inc.</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>1 upvote</p>
                    </div>
                </li>
                <li>
                <div className={styles.section}>
                    
                    <p>18/04/2026</p>
                    <p>Lampione 42</p>
                    <p>Produttore<br></br>Daniel Lights</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>3 upvote</p>
                    </div>
                </li>

                <li>
                <div className={styles.section}>
                    
                    <p>21/04/2026</p>
                    <p>Lampione 23</p>
                    <p>Produttore<br></br>Quei Ragazzi Inc.</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>1 upvote</p>
                    </div>
                </li>
                <li>
                <div className={styles.section}>
                    
                    <p>18/04/2026</p>
                    <p>Lampione 42</p>
                    <p>Produttore<br></br>Daniel Lights</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>3 upvote</p>
                    </div>
                </li>

                <li>
                <div className={styles.section}>
                    
                    <p>21/04/2026</p>
                    <p>Lampione 23</p>
                    <p>Produttore<br></br>Quei Ragazzi Inc.</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>1 upvote</p>
                    </div>
                </li>
                <li>
                <div className={styles.section}>
                    
                    <p>18/04/2026</p>
                    <p>Lampione 42</p>
                    <p>Produttore<br></br>Daniel Lights</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>3 upvote</p>
                    </div>
                </li>

                <li>
                <div className={styles.section}>
                    
                    <p>21/04/2026</p>
                    <p>Lampione 23</p>
                    <p>Produttore<br></br>Quei Ragazzi Inc.</p>
                </div>
                    <div className={styles.section}>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p> <img src="/upvote.png" width={30}height={30}></img>1 upvote</p>
                    </div>
                </li>
                
            </ul>
        </div>
    );
}