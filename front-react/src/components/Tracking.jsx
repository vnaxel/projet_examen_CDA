import { useKeycloak } from "@react-keycloak/web"
import React, { useEffect, useState } from "react"
import { LinearProgress, Paper } from "@mui/material"
import Sending from "./Sending"

const Tracking = () => {
    const { keycloak } = useKeycloak()

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchDatas = () => {
        fetch(`http://localhost:3001/sending/${keycloak.tokenParsed.sub}`, {
            headers: {
                authorization: "Bearer " + keycloak.token,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                data.sendings = data.sendings.reverse()
                setData(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            // simulate a delay to enjoy MUI loading bar
            setInterval(() => {
                // refresh every 1s
                fetchDatas()
            }, 1000)
        }, 1000)
    }, [])

    return (
        <div className="composant">
            {loading && (
                <Paper className="paper card">
                    <LinearProgress sx={{ width: "100%" }} />
                </Paper>
            )}
            {data &&
                data.sendings.map((sending, index) => (
                    <Sending sending={sending} key={index} />
                ))}
            {data && data.sendings.length === 0 && (
                <Paper className="paper card text-center">
                    Vous n'avez pas encore fait d'envoi.
                </Paper>
            )}
        </div>
    )
}

export default Tracking
