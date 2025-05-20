import { createSlice, current } from '@reduxjs/toolkit'

const initialState = "ALL"

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            console.log(state)
            const filter = action.payload
            return filter
        }
    }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer