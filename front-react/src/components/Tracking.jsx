import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Sending from "./Sending";
import Paper from "@mui/material/Paper";

const Tracking = () => {
    const { keycloak } = useKeycloak();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => { // Simulate a delay
            fetch(`http://localhost:3001/sending/${keycloak.tokenParsed.sub}`, {
                headers: {
                    authorization: "Bearer " + keycloak.token,
                    "Content-Type": "application/json",
                },
            })
                .then(res => res.json())
                .then(data => {
                    data.sendings = data.sendings.reverse()
                    setData(data);
                    setLoading(false);
                });
        }, 500); // Simulate a delay
    }, []);

    return (
        <div className="composant">
                {loading && <Paper className="paper card"><LinearProgress sx={{width: "100%"}}/></Paper>}
                {data &&
                    data.sendings.map((sending, index) =>
                    <Sending sending={sending} key={index}/>
                    )}
                {data && data.sendings.length === 0 && <Paper className="paper card text-center">Vous n'avez pas encore fait d'envoi.</Paper>}
        </div>
    );
};

export default Tracking;
