import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [session, setSession] = useState()
    const [user, setUser] = useState()

    useEffect(
        () => {
            setSession(supabase.auth.session())
            setUser(supabase.auth.session()?.user)

            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session)
                setUser(session?.user)
            })
        },
        []
    )

    return (
        <AuthContext.Provider value={{ session, user }} >
            {children}
        </AuthContext.Provider>
    )


}