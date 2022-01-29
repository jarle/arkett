import { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export const AuthContext = createContext<AuthContextInterface>(null)

interface AuthContextInterface {
    session: Session
    user: User
}

export default function AuthProvider({ children }) {
    const [session, setSession] = useState<Session>()
    const [user, setUser] = useState<User>()

    useEffect(
        () => {
            setSession(supabase.auth.session())
            setUser(supabase.auth.session()?.user)

            supabase.auth.onAuthStateChange((_event, newSession) => {
                setSession(newSession)
                setUser(newSession?.user)
            })
        },
        []
    )

    const exports: AuthContextInterface = {
        session,
        user
    }

    return (
        <AuthContext.Provider value={exports} >
            {children}
        </AuthContext.Provider>
    )


}