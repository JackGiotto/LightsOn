import React from "react";
import styles from"../../Style/dashboard/segnalazioni.module.css";
import { useState } from "react";


const Overview = ({showOverview, setShowOverview, descriptions}) =>  {
  if(!showOverview) {
    return null
  }

  if (descriptions.length == 0) {
    return (
        <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h3>Nessuna Descrizione per questa segnalazione</h3>
          </div>
    )
  }

  console.log(descriptions);
  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h1>Descrizioni</h1>
            <ul className={styles.overviewElements}>
                {
                    descriptions.map((description, index) => (
                        <li className={styles.overviewElement} key={index}>
                            <p>{description}</p>
                        </li>
                    ))
                }
              
            </ul>
          </div>
  )
}

const Report = ({report}) => {

    const [showOverview, setOverview] = useState(false);

    const handleCall = (number) => {
        if (number) {
            window.location.href = `tel:+39${number}`;
        } else {
            alert("Numero di telefono non disponibile per questo produttore.");
        }
    };

    return (
        <li className={styles.reportElement}>
                            <div className={styles.section}>
                                <p>{new Date(report.date).toLocaleDateString('it-IT', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</p>
                                <p>Lampione {report.id}</p>
                                <p>Produttore<br></br>{report.producer.name}</p>
                            </div>

                            <div className={styles.section}>
                                <button className={styles.contactButton}  onClick={() => setOverview(!showOverview)}>{report.problemType}</button>
                                <button className={styles.contactButton} onClick={() => handleCall(report.producer.phone)}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                                <p><img src="/up-arrow.png" width={30}height={30}></img>{report.upvoteCount} upvote</p>
                            </div>

                            <Overview showOverview={showOverview} setShowOverview={setOverview} descriptions={report.descriptions}></Overview>
                        </li>
    )
}



export const Segnalazioni = () => {


    const reports = [{
        date: Date.now(),
        id: 42,
        producer: {
            name:"Daniel Lights",
            phone: "3454149835"
        },
        problemType: "Lampeggiante",
        upvoteCount: 3,
        descriptions: [
            "Buongiorno, desidero segnalare che il lampione situato in Via Roma, di fronte al civico 42, è completamente spento da almeno tre sere. La strada rimane in una zona d'ombra pericolosa per i pedoni. Chiedo un intervento di ripristino il prima possibile. Grazie.",
            "Buongiorno, vi scrivo per segnalare che in Via Verdi il lampione all'altezza dell'incrocio con Via Dante appare visibilmente inclinato e con la base del palo arrugginita/danneggiata. Temo possa essere un pericolo in caso di forte vento. Sarebbe opportuno un sopralluogo tecnico di sicurezza. Grazie per l'attenzione."
        ]
    },
    {
        date: Date.now(),
        id: 43,
        producer: {
            name:"Quei Ragazzi Inc.",
            phone: "3454149835"
        },
        problemType: "Lampeggiante",
        upvoteCount: 0,
        descriptions: [
            "Buongiorno, desidero segnalare che il lampione situato in Via Roma, di fronte al civico 42, è completamente spento da almeno tre sere. La strada rimane in una zona d'ombra pericolosa per i pedoni. Chiedo un intervento di ripristino il prima possibile. Grazie.",
        ]
    },
    {
        date: Date.now(),
        id: 44,
        producer: {
            name:"Daniel Lights",
            phone: "3454149835"
        },
        problemType: "Lampeggiante",
        upvoteCount: 2,
        descriptions: []
    },
    {
        date: Date.now(),
        id: 45,
        producer: {
            name:"Daniel Lights",
            phone: "3454149835"
        },
        problemType: "Lampeggiante",
        upvoteCount: 2,
        descriptions: [
            "Salve, scrivo per segnalare un guasto diffuso lungo tutta Via Torino. Dall'incrocio con Via Milano fino al civico 100, circa metà dei lampioni risulta spenta. La via è molto buia e questo crea disagio a residenti e automobilisti. Spero in un intervento risolutivo a breve.",
            "Buongiorno, vorrei far notare che l'area del parchetto in Via dei Mille risulta quasi completamente al buio. Diversi punti luce sono fuori uso e la situazione rende l'area poco sicura per chi rientra a casa la sera. Sarebbe fondamentale ripristinare l'illuminazione per garantire maggiore sicurezza al quartiere.",
            "Salve, scrivo per segnalare un guasto diffuso lungo tutta Via Torino. Dall'incrocio con Via Milano fino al civico 100, circa metà dei lampioni risulta spenta. La via è molto buia e questo crea disagio a residenti e automobilisti. Spero in un intervento risolutivo a breve."
        ]
    },
    ];

    return (
        <div className={styles.container}>
            <h1>Controllo Segnalazioni  <img src="/upvote.png" width={50}height={50}></img></h1>

            <ul className={styles.reportList}>
                {
                    [...reports].sort((a, b) => b.upvoteCount - a.upvoteCount).map((report) => (
                        <Report report={report}></Report>
                    ))
                }
            </ul>
        </div>
    );
}