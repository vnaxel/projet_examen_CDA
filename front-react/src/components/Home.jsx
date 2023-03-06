import { Paper, Typography } from "@mui/material"
import React from "react"
import logo from "../assets/mail-142.svg"

const Home = () => {
    return (
        <div className="composant">
            <Paper className="homePaper">
                <Typography
                    variant="h6"
                    fontSize={22}
                    className="home__title"
                    component="div">
                    <div>
                        <img className="logo" src={logo} />
                        MAILER
                    </div>
                    <span className="separator">-</span>
                    Application d'envoi de courriers groupés
                </Typography>
                <br />
                <p>
                    Ce projet est une application d' envoi de lettres vers de
                    multiples destinataires : la lettre est redigée dans
                    l'interface graphique, puis elle est materialisée par la
                    poste avant d'être distribuée aux destinataires par ce même
                    partenaire.
                </p>
                <br />
                <p>
                    Les status de production et de distribution pour chaque
                    destinataire sont ensuite remontés dans une pipeline de
                    streaming et mis à disposition de l'envoyeur.
                </p>
                <br />
                <p>
                    Dans ce projet la materialisation et la distribution des
                    lettres est factice: une application Go ecoute les
                    insertions dans la base de donnée des envois, puis, pour
                    chaque destinataire, emet un evenement "Produced" ainsi
                    qu'un evenement "Delivered" après un temps aléatoire.
                </p>
                <br />
                <p>
                    Ces evenements kafka sont consommés par le backend
                    typescript qui se charge de mettre à jour la base de donnée.
                    Le frontend actualise l'affichage des status toutes les
                    secondes.
                </p>
                <br />
                <p>Le projet est composé de 3 applications :</p>
                <br />
                <ul>
                    <li>Une application front en React.</li>
                    <li>Un microservice en Go.</li>
                    <li>Un microservice en Typescript.</li>
                </ul>
                <br />
                <p>Le projet utilise plusieurs containers :</p>
                <br />
                <ul>
                    <li>Un container pour la base de données mongo.</li>
                    <li>
                        Trois containers pour kafka: un broker, un zookeeper et
                        akhq.
                    </li>
                    <li>
                        Un container keycloak, qui detient la base utilisateur
                        et distribue les tokens d'authentification.
                    </li>
                </ul>
                <br />
                <img src="./schema_d'architecture.drawio.svg" alt="" />
                <p>
                    Le code du projet est disponible sur{" "}
                    <u>
                        <a href="https://github.com/vnaxel/projet_examen_CDA">
                            Github
                        </a>
                    </u>
                    .
                </p>
            </Paper>
        </div>
    )
}

export default Home
