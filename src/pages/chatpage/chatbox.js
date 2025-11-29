import { useContext, useState, useRef, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipients";
import moment from "moment"
import InputEmoji from "react-input-emoji"
import { useTheme } from "../../context/ThemeContext";
import { useModal } from "../../context/ModalContext";
import styles from "./chatbox.module.css"

const Chatbox = () => {
    const { currentChat, messages, sendTextMessage, deleteChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const [textMessage, setTextMessage] = useState("")
    const { recipientUser } = useFetchRecipientUser(currentChat, user)
    const { theme } = useTheme()
    const { showConfirm, showError, showSuccess } = useModal()
    const messagesEndRef = useRef(null)
    const messagesContainerRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (messages && messages.length > 0) {
            scrollToBottom()
        }
    }, [messages])

    if (!recipientUser) {
        return (
            <div className={`${styles.emptyState} ${styles[theme]}`}>
                <div className={styles.emptyStateContent}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <h3>Select a conversation</h3>
                    <p>Choose a chat from the sidebar to start messaging</p>
                </div>
            </div>
        )
    }

    const handleSendMessage = () => {
        if (textMessage.trim()) {
            sendTextMessage(currentChat?._id, user?._id, textMessage, setTextMessage)
        }
    }

    const handleDeleteChat = async () => {
        if (!currentChat?._id) return

        const confirmed = await showConfirm(
            "Delete Conversation",
            `Are you sure you want to delete this conversation with ${recipientUser?.FirstName} ${recipientUser?.LastName}? This action cannot be undone.`,
            {
                confirmText: "Delete",
                cancelText: "Cancel",
                type: "warning"
            }
        )

        if (confirmed) {
            const result = await deleteChat(currentChat._id)
            if (result.error) {
                await showError(
                    "Delete Failed",
                    "Failed to delete conversation. Please try again."
                )
            } else {
                await showSuccess(
                    "Conversation Deleted",
                    "The conversation has been deleted successfully."
                )
            }
        }
    }

    return (
        <div className={`${styles.chatbox} ${styles[theme]}`}>
            {/* Sticky Header */}
            <div className={styles.chatHeader}>
                <div className={styles.headerLeft}>
                    <div className={styles.avatar}>
                        {recipientUser?.FirstName?.[0]}{recipientUser?.LastName?.[0]}
                    </div>
                    <div className={styles.headerInfo}>
                        <h3 className={styles.chatName}>
                            {`${recipientUser?.FirstName} ${recipientUser?.LastName}`}
                        </h3>
                        <div className={styles.onlineStatus}>
                            <span className={styles.statusDot}></span>
                            <span className={styles.statusText}>Online</span>
                        </div>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button
                        className={`${styles.headerButton} ${styles.deleteButton}`}
                        onClick={handleDeleteChat}
                        title="Delete conversation"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages Container */}
            <div ref={messagesContainerRef} className={styles.messagesContainer}>
                {messages && messages.length > 0 ? (
                    messages.map((message, index) => {
                        const isOwnMessage = message?.senderID === user?._id
                        return (
                            <div
                                key={index}
                                className={`${styles.messageWrapper} ${isOwnMessage ? styles.ownMessage : styles.otherMessage}`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className={`${styles.messageBubble} ${isOwnMessage ? styles.ownBubble : styles.otherBubble}`}>
                                    <p className={styles.messageText}>{message?.text}</p>
                                    <span className={styles.messageTime}>
                                        {moment(message?.createdAt).format('HH:mm')}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className={styles.noMessages}>
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className={styles.inputBar}>
                <button className={styles.inputButton} title="Add attachment">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                </button>
                <div className={styles.inputWrapper}>
                    <InputEmoji
                        value={textMessage}
                        onChange={setTextMessage}
                        onEnter={handleSendMessage}
                        placeholder="Type a message..."
                        cleanOnEnter
                    />
                </div>
                <button
                    className={`${styles.sendButton} ${textMessage.trim() ? styles.active : ''}`}
                    onClick={handleSendMessage}
                    disabled={!textMessage.trim()}
                    title="Send message"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Chatbox;
