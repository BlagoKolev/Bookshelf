import { auth } from '../firebase-config.js'
import { createContext, useState, useEffect } from "react";


export const UserContext = createContext({});


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}