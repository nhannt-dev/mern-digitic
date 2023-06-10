import { useEffect, useState } from "react"

const useDebounce = (value, ms) => {
    const [debounceValue, setDebounceValue] = useState(0)
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebounceValue(value)
        }, ms)
        return () => clearTimeout(timeOut)
    }, [value, ms])
    return debounceValue
}

export default useDebounce
