import TrackingRcpt from "./TrackingRcpt"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"

const Sending = ({ sending }) => {
    return (
        <Paper className="paper tracking-sending">
            <Box className="card">
                <b>Envoi du {new Date(sending.date).toLocaleString("fr-FR")}</b>
                {sending.recipients.map((recipient, index) => (
                    <TrackingRcpt recipient={recipient} key={index} />
                ))}
            </Box>
        </Paper>
    )
}

export default Sending
