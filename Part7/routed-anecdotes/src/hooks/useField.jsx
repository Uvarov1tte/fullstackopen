import { useState } from 'react'

export const useField = (type, name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }

    return {
        input: {
            type,
            name,
            value,
            onChange
        },
        reset
    }
}
