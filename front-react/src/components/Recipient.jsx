import Chip from '@mui/material/Chip';
import React from "react";

const Recipient = ({recipient, recipients, setRecipients}) => {
    const handleRemove = () => {
        setRecipients(recipients.filter(rcp => rcp !== recipient))
    }

    return <Chip sx={{
        margin: ".5rem .5rem 0 0"
    }} onDelete={() => handleRemove(recipient)} label={`${recipient.firstName} ${recipient.lastName} ${recipient.address}`} variant="outlined">
    </Chip>
}

export default Recipient