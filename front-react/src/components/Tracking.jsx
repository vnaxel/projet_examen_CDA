import Paper from "@mui/material/Paper";
import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const Tracking = () => {
    const { keycloak } = useKeycloak();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/sending/${keycloak.tokenParsed.sub}`, {
            headers: {"authorization": "Bearer " + keycloak.token, "Content-Type": "application/json"}, 
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setData(data);
            setLoading(false);
            setError(null);
        })
       }, []);

    return <div className="composant">
        <Paper className="trackingPaper">
        {loading && <LinearProgress />}
        {error && <div>Une erreur est survenue</div>}
        {data && data.sendings.map(sending => sending.recipients.map(recipient => <div className="tracking">{recipient.firstName + " " + recipient.lastName} : {recipient.deliveryStatuses.lastStatus.date} {recipient.deliveryStatuses.lastStatus.status} {recipient.deliveryStatuses.statusesHistory.map(status => <div>{status.date} {status.status}</div>)}</div>))}
        </Paper>
    </div>
}

export default Tracking