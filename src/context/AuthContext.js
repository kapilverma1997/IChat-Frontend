import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    loginInfo: undefined,
    setLoginInfo: () => { },
    signUpInfo: undefined,
    setSignUpInfo: () => { },
    chatInfo: undefined,
    setChatInfo: () => { },
    messages: undefined,
    setMessages: () => { },
    errorMessage: undefined,
    setErrorMessage: () => { },
    user: undefined,
    setUser: () => { },
    logoutUser: () => { }
})

export default function AuthContextProvider({ children }) {

    const [loginInfo, setLoginInfo] = useState(undefined)
    const [signUpInfo, setSignUpInfo] = useState(undefined)
    const [chatInfo, setChatInfo] = useState(undefined)
    const [messages, setMessages] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [user, setUser] = useState(() => {
        // Load user from localStorage on initial mount
        const storedUser = localStorage.getItem("User")
        if (storedUser) {
            try {
                return JSON.parse(storedUser)
            } catch (error) {
                console.error('Error parsing user from localStorage:', error)
                return undefined
            }
        }
        return undefined
    })

    useEffect(() => {
        // Also update user when loginInfo changes (after login)
        const newUser = localStorage.getItem("User")
        if (newUser) {
            try {
                const parsedUser = JSON.parse(newUser)
                setUser(parsedUser)
            } catch (error) {
                console.error('Error parsing user from localStorage:', error)
            }
        }
    }, [loginInfo]);

    const logoutUser = () => {
        localStorage.removeItem("User")
        setLoginInfo(undefined)
        setUser(undefined)
    }

    const value = {
        loginInfo,
        setLoginInfo,
        messages,
        setMessages,
        errorMessage,
        setErrorMessage,
        user,
        setUser,
        signUpInfo,
        setSignUpInfo,
        chatInfo,
        setChatInfo,
        logoutUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}