import { Paper } from "@mui/material"
import React from "react"

const Home = () => {
    return (
        <div className="composant">
            <Paper className="homePaper">
                <h1>Examen CDA: Application d'envois groupés</h1>
                <br />
                <br />
                <p>
                    Ce projet est une application d'
                    <strong>
                        envoi de lettres vers de multiples destinataires
                    </strong>
                    : la lettre est redigée dans l'interface graphique, puis
                    elle est <strong>materialisée</strong> par la poste avant
                    d'être <strong>distribuée aux destinataires</strong> par ce
                    même partenaire.
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
                    insertions dans la base de donnée des envois, puis pour
                    chaque destinataire, emet un evenement "Produced" ainsi
                    qu'un evenement "Delivered" après un temps aléatoire.
                </p>
                <br />
                <p>
                    Ces evenements kafka sont consommés par le backend typscript
                    qui se charge de mettre à jour la base de donnée et de
                    notifier le frontend via une connexion websocket.
                </p>
                <br />
                <p>Le projet est composé de 3 applications :</p>
                <br />
                <ul>
                    <li>
                        Une application front en <strong>React</strong>.
                    </li>
                    <li>
                        Un microservice en <strong>Go</strong>.
                    </li>
                    <li>
                        Un microservice en <strong>Typscript</strong>.
                    </li>
                </ul>
                <br />
                <p>Le projets utilise plusieurs containers :</p>
                <br />
                <ul>
                    <li>
                        Un container pour la base de données{" "}
                        <strong>mongo</strong>.
                    </li>
                    <li>
                        Trois containers pour <strong>kafka</strong>: un broker,
                        un zookeeper et akhq.
                    </li>
                    <li>
                        Un container <strong>keycloak</strong>, qui detient la
                        base utilisateur et distribue les tokens
                        d'authentification et d'autorisation.
                    </li>
                </ul>
                <br />
                <img src="./projet-CDA.drawio.png" alt="" />
                <p>
                    Le code du projet est disponible sur{" "}
                    <a href="https://github.com/vnaxel/projet_examen_CDA">
                        Github
                    </a>
                    .
                </p>
            </Paper>
        </div>
    )
}

export default Home
