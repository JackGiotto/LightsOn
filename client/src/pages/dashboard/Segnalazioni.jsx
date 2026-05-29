import React from "react";
import styles from"../../Style/dashboard/segnalazioni.module.css";
import { useState } from "react";


function Overview({showOverview, setShowOverview})  {
  if(!showOverview) {
    return null
  }
  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h1>Descrizioni</h1>
            <ul className={styles.overviewElements}>
              <li className={styles.overviewElement}>
                <p>Buongiorno, desidero segnalare che il lampione situato in Via Roma, di fronte al civico 42, è completamente spento da almeno tre sere. La strada rimane in una zona d'ombra pericolosa per i pedoni. Chiedo un intervento di ripristino il prima possibile. Grazie.</p>
              </li>
              <li className={styles.overviewElement}>
                <p>Buongiorno, vi scrivo per segnalare che in Via Verdi il lampione all'altezza dell'incrocio con Via Dante appare visibilmente inclinato e con la base del palo arrugginita/danneggiata. Temo possa essere un pericolo in caso di forte vento. Sarebbe opportuno un sopralluogo tecnico di sicurezza. Grazie per l'attenzione.</p>
              </li>

              <li className={styles.overviewElement}>
                <p>Buongiorno, desidero segnalare che il lampione situato in Via Roma, di fronte al civico 42, è completamente spento da almeno tre sere. La strada rimane in una zona d'ombra pericolosa per i pedoni. Chiedo un intervento di ripristino il prima possibile. Grazie.</p>
              </li>
              <li className={styles.overviewElement}>
                <p>Buongiorno, vorrei far notare che l'area del parchetto in Via dei Mille risulta quasi completamente al buio. Diversi punti luce sono fuori uso e la situazione rende l'area poco sicura per chi rientra a casa la sera. Sarebbe fondamentale ripristinare l'illuminazione per garantire maggiore sicurezza al quartiere.</p>
              </li>

              <li className={styles.overviewElement}>
                <p>Salve, scrivo per segnalare un guasto diffuso lungo tutta Via Torino. Dall'incrocio con Via Milano fino al civico 100, circa metà dei lampioni risulta spenta. La via è molto buia e questo crea disagio a residenti e automobilisti. Spero in un intervento risolutivo a breve.</p>
              </li>
              
            </ul>
          </div>
  )
}



export const Segnalazioni = () => {

    const [showOverview, setOverview] = useState(false);

    const handleCall = () => {
      window.location.href = 'tel:+1234567890';
    };

    return (
        <div className={styles.container}>
            <h1>Controllo Segnalazioni  <img src="/upvote.png" width={50}height={50}></img></h1>

            <ul className={styles.reportList}>
                <li className={styles.reportElement}>
                    <div className={styles.section}>
                        <p>18/04/2026</p>
                        <p>Lampione 42</p>
                        <p>Produttore<br></br>Daniel Lights</p>
                    </div>

                    <div className={styles.section}>
                        <button className={styles.contactButton}  onClick={() => setOverview(!showOverview)}>Lampeggiante</button>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p><img src="/up-arrow.png" width={30}height={30}></img>3 upvote</p>
                    </div>

                    <Overview showOverview={showOverview} setShowOverview={setOverview}></Overview>
                </li>
                <li className={styles.reportElement}>
                    <div className={styles.section}>
                        <p>18/04/2026</p>
                        <p>Lampione 42</p>
                        <p>Produttore<br></br>Daniel Lights</p>
                    </div>

                    <div className={styles.section}>
                        <button className={styles.contactButton}  onClick={() => setOverview(!showOverview)}>Lampeggiante</button>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p><img src="/up-arrow.png" width={30}height={30}></img>3 upvote</p>
                    </div>

                    <Overview showOverview={showOverview} setShowOverview={setOverview}></Overview>
                </li>
                <li className={styles.reportElement}>
                    <div className={styles.section}>
                        <p>18/04/2026</p>
                        <p>Lampione 42</p>
                        <p>Produttore<br></br>Daniel Lights</p>
                    </div>

                    <div className={styles.section}>
                        <button className={styles.contactButton}  onClick={() => setOverview(!showOverview)}>Lampeggiante</button>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p><img src="/up-arrow.png" width={30}height={30}></img>3 upvote</p>
                    </div>

                    <Overview showOverview={showOverview} setShowOverview={setOverview}></Overview>
                </li>
                <li className={styles.reportElement}>
                    <div className={styles.section}>
                        <p>18/04/2026</p>
                        <p>Lampione 42</p>
                        <p>Produttore<br></br>Daniel Lights</p>
                    </div>

                    <div className={styles.section}>
                        <button className={styles.contactButton}  onClick={() => setOverview(!showOverview)}>Lampeggiante</button>
                        <button className={styles.contactButton} onClick={handleCall}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                        <p><img src="/up-arrow.png" width={30}height={30}></img>3 upvote</p>
                    </div>

                    <Overview showOverview={showOverview} setShowOverview={setOverview}></Overview>
                </li>

                
                
                
            </ul>
        </div>
    );
}