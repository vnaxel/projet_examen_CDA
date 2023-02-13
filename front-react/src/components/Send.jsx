import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Recipient from "./Recipient";
import { useKeycloak } from "@react-keycloak/web";


const Send = () => {
    const { keycloak } = useKeycloak();

    const [letter, setLetter] = useState("");
    const [letterTouched, setLetterTouched] = useState(false);

    const buildAndSend = async () => {
        if (!letter.length) {setLetterTouched(true)}
        if (!letter.length) {return}
        if (!recipients.length) {
            alert("Vous devez ajouter au moins un destinataire");
            return
        }

        const body = {
            "sending" : {
                "letter" : letter,
                "recipients" : recipients
            }
        }

        fetch("http://localhost:3001/sending", {method: "POST", body: JSON.stringify(body), headers: {"authorization": "Bearer " + keycloak.token, "Content-Type": "application/json"}})
            .then(response => response.json())
            .then(data => {
                if (data.sending._id) {
                    alert("La lettre va être produite puis envoyée aux destinataire(s) : " + recipients.map(rcp => rcp.firstName + " " + rcp.lastName).join(", "));
                    setLetter("");
                    setLetterTouched(false);
                    setFirstNameTouched(false);
                    setLastNameTouched(false);
                    setStreetTouched(false);
                    setCityTouched(false);
                    setZipCodeTouched(false);
                    setRecipients([]);
                } else {
                    alert("Une erreur est survenue lors de l'envoi de la lettre");
                }
            })
        
    }

    const [lastNameTouched, setLastNameTouched] = useState(false);
    const [firstNameTouched, setFirstNameTouched] = useState(false);
    const [streetTouched, setStreetTouched] = useState(false);
    const [cityTouched, setCityTouched] = useState(false);
    const [zipCodeTouched, setZipCodeTouched] = useState(false);

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    const handleSubmit = (e) => {
        if (!lastName.length) {setLastNameTouched(true)}
        if (!firstName.length) {setFirstNameTouched(true)}
        if (!street.length) {setStreetTouched(true)}
        if (!city.length) {setCityTouched(true)}
        if (!zipCode.length) {setZipCodeTouched(true)}
        if (!zipCode.match(/^[0-9]{5}$/)) {setZipCodeTouched(true)}
        if (
            !lastName.length ||
            !firstName.length ||
            !street.length ||
            !city.length ||
            !zipCode.length ||
            !zipCode.match(/^[0-9]{5}$/)
        ) {
            return
        }

        setRecipients([
            ...recipients,
            {
                firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
                lastName: lastName.toUpperCase(),
                address: street + " " + zipCode + " " + city.charAt(0).toUpperCase() + city.slice(1),
            },
        ])
    
        setFirstName("");
        setLastName("");
        setStreet("");
        setCity("");
        setZipCode("");
        setFirstNameTouched(false);
        setLastNameTouched(false);
        setStreetTouched(false);
        setCityTouched(false);
        setZipCodeTouched(false);
    };

    const [recipients, setRecipients] = useState([]);

    const listRecipients = recipients.map((rcp, i) => (
        <Recipient recipient={rcp} recipients={recipients} setRecipients={setRecipients} key={i}/>
    ));

    return (
        <div className="composant">
            <Paper className="recipient paper">
                <Box className="card">
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontSize: "1.2rem",
                        }}
                    >
                        Ajoutez un destinataire
                    </Typography>
                    <Box className="recipient__input" component="form">
                        <div className="formControl">
                            <TextField
                                id="lastName"
                                label="Nom"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    setLastNameTouched(true)
                                }}
                                error={lastNameTouched && lastName.trim().length === 0}
                                helperText={
                                    lastNameTouched && !lastName.trim().length ? "Champ obligatoire" : ""
                                }
                            />
                        </div>

                        <div className="formControl">
                            <TextField
                                id="firstName"
                                label="Prénom"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    setFirstNameTouched(true)
                                }}
                                error={firstNameTouched && firstName.trim().length === 0}
                                helperText={
                                   firstNameTouched && !firstName.trim().length ? "Champ obligatoire" : ""
                                }
                            />
                        </div>

                        <div className="formControl">
                            <TextField
                                id="street"
                                label="Adresse"
                                value={street}
                                onChange={(e) => {
                                    setStreet(e.target.value)
                                    setStreetTouched(true)
                                }}
                                error={streetTouched && street.trim().length === 0}
                                helperText={
                                    streetTouched && !street.trim().length ? "Champ obligatoire" : ""
                                }
                            />
                        </div>

                        <div className="formControl">
                            <TextField
                                id="city"
                                label="Ville"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value)
                                    setCityTouched(true)
                                }}
                                error={cityTouched && city.trim().length === 0}
                                helperText={
                                    cityTouched && !city.trim().length ? "Champ obligatoire" : ""
                                }
                            />
                        </div>

                        <div className="formControl">
                            <TextField
                                id="zipCode"
                                label="Code postal"
                                value={zipCode}
                                onChange={(e) => {
                                    setZipCode(e.target.value)
                                    setZipCodeTouched(true)
                                }}
                                error={
                                    zipCodeTouched && (
                                    zipCode.trim().length === 0 ||
                                    !zipCode.match(/^[0-9]{5}$/)
                                    )
                                }
                                helperText={
                                    zipCodeTouched &&
                                    !zipCode.length
                                        ? "Champ obligatoire"
                                        : zipCodeTouched && !zipCode.match(/^[0-9]{5}$/)
                                        ? "Code postal invalide"
                                        : ""
                                }
                            />
                        </div>

                        <Button variant="contained" onClick={handleSubmit}>
                            Ajouter
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <Paper className="recipientList paper">
                <Box className="card">
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontSize: "1.2rem",
                        }}
                    >
                        Destinataires
                    </Typography>
                    <Box className="recipientList__list">{listRecipients}</Box>
                </Box>
            </Paper>
            <Paper
                className="send"
                component="form"
                noValidate
                autoComplete="off"
            >
                <Box className="card">
                    <Box className="send__input">
                        <TextField
                            onChange={(e) => {
                                setLetter(e.target.value)
                                setLetterTouched(true)
                            }}
                            value={letter}
                            id="letter"
                            label="Envoi de message"
                            multiline
                            style={{ width: "100%" }}
                            rows={20}
                            variant="standard"
                            error={letterTouched && letter.trim().length === 0}
                            helperText={
                                letterTouched && !letter.trim().length ? "La lettre ne doit pas être vide" : ""
                            }
                        />
                    </Box>
                    <Box className="send__submit">
                        <Button onClick={() => buildAndSend()} variant="contained" style={{ width: "5rem" }}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
};

export default Send;
