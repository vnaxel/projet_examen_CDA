import Divider from "@mui/material/Divider"
import GradingIcon from "@mui/icons-material/Grading"
import PrintIcon from "@mui/icons-material/Print"
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { Typography } from "@mui/material"

const TrackingRcpt = ({ recipient }) => {
    return (
        <>
            <Divider sx={{ marginTop: "1rem" }} />
            <div className="tracking__recipient">
                <div className="tracking__recipient__name">
                    <Typography variant="h6" className="tracking__recipient__name__header">Destinataire :</Typography>
                    <p>{recipient.firstName + " " + recipient.lastName}</p>
                    {" "}
                    <p>{recipient.address}</p>
                </div>

                {recipient.deliveryStatuses.statusesHistory.map(
                    (status, index) => (
                        <div
                            key={index}
                            className="tracking__recipient__status">
                            {status.status === "CREATED" && (
                                <GradingIcon sx={{ color: "#42a5f5" }} />
                            )}
                            {status.status === "PRODUCED" && (
                                <PrintIcon sx={{ color: "#42a5f5" }} />
                            )}
                            <p>{status.status}</p>
                            <p>
                                {new Date(status.date).toLocaleString("fr-FR")}
                            </p>
                        </div>
                    )
                )}
                <div className="tracking__recipient__lastStatus">
                    {recipient.deliveryStatuses.lastStatus.status ===
                        "CREATED" && <GradingIcon sx={{ color: "#42a5f5" }} />}
                    {recipient.deliveryStatuses.lastStatus.status ===
                        "PRODUCED" && <PrintIcon sx={{ color: "#42a5f5" }} />}
                    {recipient.deliveryStatuses.lastStatus.status ===
                        "DELIVERED" && (
                        <MarkEmailReadIcon sx={{ color: "#42a5f5" }} />
                    )}
                    {recipient.deliveryStatuses.lastStatus.status ===
                        "NOT_FOUND" && (
                        <ErrorOutlineIcon sx={{ color: "red" }} />
                    )}
                    <p>{recipient.deliveryStatuses.lastStatus.status}</p>
                    <p>
                        {new Date(
                            recipient.deliveryStatuses.lastStatus.date
                        ).toLocaleString("fr-FR")}
                    </p>
                </div>
            </div>
        </>
    )
}

export default TrackingRcpt
