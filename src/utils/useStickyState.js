import { useEffect, useRef, useState } from "react";

export default function useStickyState(defaultValue, key) {
    const previousValue = useRef(null)

    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });

    const handleChangeInStorage = (event) => {
        if (event.key === 'content' && event.newValue !== previousValue) {
            console.log(event)
            console.log(event.newValue)
            setValue(JSON.parse(event.newValue))
        }
    }
    useEffect(() => {
        window.addEventListener('storage', handleChangeInStorage)
        return () => window.removeEventListener('storage', handleChangeInStorage)
    }, [])

    useEffect(() => {
        console.log("Save to local storage")
        const newValue = JSON.stringify(value)
        if (newValue !== previousValue.current) {
            previousValue.current = newValue
            window.localStorage.setItem(key, newValue);
        }

    }, [key, value]);

    return [value, setValue];
}