import { createSlice, current } from '@reduxjs/toolkit'

const initialState = "NONE"

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        getNotification(state, action) {
            const content = action.payload
            if (content === 'NONE') {
                return state = 'NONE'
            }
            return state = `You voted ${content}`
        }
    }
})

export const { getNotification } = notificationSlice.actions
export default notificationSlice.reducer