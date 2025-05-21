import { createContext, useReducer, useContext } from 'react'

const notifReducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case 'SHOW':
            return action.payload;
        case 'HIDE':
            return '';
        default:
            return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notifReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotifValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotifDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext