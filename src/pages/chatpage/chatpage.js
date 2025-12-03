import io from "socket.io-client"
import { useEffect, useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { axios_ } from "../../utils/utils"
import "bootstrap/dist/css/bootstrap.min.css"
import { ChatContext } from "../../context/ChatContext"
import Userchat from "./userchat"
import Chatbox from "./chatbox"
import { useTheme } from "../../context/ThemeContext"
import styles from "./chatpage.module.css"

export default function Chatpage() {

    const [isNewChatOpen, setIsNewChatOpen] = useState(false)
    const [newChatEmail, setNewChatEmail] = useState("")

    const { setMessages } = useContext(AuthContext)
    const { userChats, createChat } = useContext(ChatContext)
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

    const handleNewChatSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault()
        }

        const trimmedEmail = newChatEmail.trim()
        if (!trimmedEmail) return

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(trimmedEmail)) {
            alert("Please enter a valid email address.")
            return
        }

        try {
            // Find user by email from backend
            const response = await axios_.post("/api/users/find-by-email", { EmailAddress: trimmedEmail })

            if (response?.data?.error) {
                alert(response.data.message || "Failed to find user.")
                return
            }

            const foundUser = response?.data?.data || response?.data
            if (!foundUser || !foundUser._id) {
                alert("User not found.")
                return
            }

            if (!user?._id) {
                alert("You must be logged in to start a chat.")
                return
            }

            if (user._id === foundUser._id) {
                alert("You cannot start a chat with yourself.")
                return
            }

            // Create or open chat between current user and found user
            await createChat(user._id, foundUser._id)
            setIsNewChatOpen(false)
            setNewChatEmail("")
        } catch (error) {
            console.error("Error starting new chat:", error)
            alert("Something went wrong while starting a new chat. Please try again.")
        }
    }

    return (
        <div className={`${styles.chatpage} ${styles[theme]}`}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>Chats</h2>
                    <div className={styles.sidebarActions}>
                        <button
                            className={styles.newChatButton}
                            onClick={() => setIsNewChatOpen(prev => !prev)}
                            title="Start a new chat"
                        >
                            New Chat
                        </button>
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
                </div>
                {isNewChatOpen && (
                    <form className={styles.newChatForm} onSubmit={handleNewChatSubmit}>
                        <input
                            type="email"
                            className={styles.newChatInput}
                            placeholder="Enter user's email"
                            value={newChatEmail}
                            onChange={(e) => setNewChatEmail(e.target.value)}
                        />
                        <div className={styles.newChatActions}>
                            <button type="submit" className={styles.newChatSubmit}>
                                Start
                            </button>
                            <button
                                type="button"
                                className={styles.newChatCancel}
                                onClick={() => {
                                    setIsNewChatOpen(false)
                                    setNewChatEmail("")
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
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