import { useNotifValue } from './NotificationContext'

const Notification = () => {
    const info = useNotifValue()
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    if (info === '') return null

    return (
        <div style={style}>
            {info}
        </div>
    )
}

export default Notification
