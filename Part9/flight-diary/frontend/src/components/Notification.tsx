interface MessageProp {
    message: string | null
}

export const Notification = (props: MessageProp) => {
    if (props.message === null) {
        return null
    }

    const style = {
        color: "red"
    }

    return (
        <h3 style={style}>
            {props.message}
        </h3>
    )
}