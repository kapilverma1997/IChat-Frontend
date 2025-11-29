import io from "socket.io-client"
import { useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { axios_ } from "../../utils/utils"
import "bootstrap/dist/css/bootstrap.min.css"
import { ChatContext } from "../../context/ChatContext"
import Userchat from "./userchat"
import PotentialChats from "./potentialChats"
import Chatbox from "./chatbox"
import { useTheme } from "../../context/ThemeContext"
import styles from "./chatpage.module.css"

export default function Chatpage() {

    const { setMessages } = useContext(AuthContext)
    const { userChats } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const newSocket = io("http://localhost:3003", { auth: { serverOffset: 0 } })

        const getMessages = async () => {
            const newMessages = await axios_.get("/messages")
            setMessages(newMessages?.data)
        }

        getMessages()
        newSocket.on('chat message', getMessages)

        return () => {
            newSocket.off('chat message', getMessages)
            newSocket.disconnect()
        }
    }, [setMessages]);

    return (
        <div className={`${styles.chatpage} ${styles[theme]}`}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>Chats</h2>
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </button>
                </div>
                <PotentialChats />
                <div className={styles.chatList}>
                    {userChats === null ? (
                        <div className={styles.noChats}>
                            <p>Loading conversations...</p>
                        </div>
                    ) : userChats?.length > 0 ? (
                        userChats.map((chat, index) => (
                            <Userchat key={index} chat={chat} user={user} />
                        ))
                    ) : (
                        <div className={styles.noChats}>
                            <p>No conversations yet</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.chatArea}>
                <Chatbox />
            </div>
        </div>
    )
}