import TrackingRcpt from "./TrackingRcpt"
import { Typography, Box, Paper } from "@mui/material"

const Sending = ({ sending }) => {
    return (
        <Paper className="paper tracking-sending">
            <Box className="card">
                <Typography variant="h6" fontSize={16} component="div">
                    Envoi du {new Date(sending.date).toLocaleString("fr-FR")}
                </Typography>
                {sending.recipients.map((recipient, index) => (
                    <TrackingRcpt recipient={recipient} key={index} />
                ))}
            </Box>
        </Paper>
    )
}

export default Sending
