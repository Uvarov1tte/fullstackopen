import { Typography } from "@mui/material"

interface MessageProp {
    message: string | null
}

export const Notification = (props: MessageProp) => {
    if (props.message === null) {
        return null
    }

    return (
        <Typography variant="h3" sx={{ color:"red"}}>{props.message}</Typography>
    )
}