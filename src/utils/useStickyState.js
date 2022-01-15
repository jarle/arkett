import { useEffect, useRef, useState } from "react";
import { supabase } from "./supabaseClient";

export default function useStickyState(defaultValue, key) {
    const previousValue = useRef(null)

    const [value, setValue] = useState(() => {
        if (typeof window === 'undefined') {
            return defaultValue
        }

        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });

    const handleChangeInStorage = event => {
        if (event.key === 'content') {
            console.debug("Storage changed, noop")
            // setRemoteValue(JSON.parse(event.newValue))
        }
    }

    const handleRemoteChange = event => {
        if (event.new.content !== previousValue.current) {
            // setRemoteValue(event.new.content)
        }
    }

    useEffect(() => {
        const mySubscription = supabase
            .from('content')
            .on('*', handleRemoteChange)
            .subscribe()

        return () => mySubscription.unsubscribe()
    }, [])

    useEffect(() => {
        window?.addEventListener('storage', handleChangeInStorage)
        return () => window?.removeEventListener('storage', handleChangeInStorage)
    }, [])

    useEffect(() => {
        console.debug("Local change, save to localstorage")
        const newValue = JSON.stringify(value)
        window.localStorage.setItem(key, newValue);
        previousValue.current = newValue
    }, [key, value]);

    return [value, setValue];
}