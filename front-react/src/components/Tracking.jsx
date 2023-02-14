import { useKeycloak } from "@react-keycloak/web"
import React, { useEffect, useState } from "react"
import LinearProgress from "@mui/material/LinearProgress"
import Sending from "./Sending"
import Paper from "@mui/material/Paper"
import { io } from "socket.io-client"

const Tracking = () => {
    const { keycloak } = useKeycloak()

    const socket = io("http://localhost:3001")
    socket.on("deliveryEvent", sendingId => {
        if (data && data.sendings.map(sending => sending._id === sendingId))
            fetchDatas()
    })

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
            // simulate a delay
            fetchDatas()
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
