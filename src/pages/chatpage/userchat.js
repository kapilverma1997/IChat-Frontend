import { useFetchRecipientUser } from "../../hooks/useFetchRecipients";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useTheme } from "../../context/ThemeContext";
import styles from "./userchat.module.css"
import moment from "moment"

const Userchat = ({ chat, user }) => {
    const { updateCurrentChat, currentChat } = useContext(ChatContext)
    const { recipientUser } = useFetchRecipientUser(chat, user)
    const { theme } = useTheme()
    const isActive = currentChat?._id === chat?._id

    const getInitials = (firstName, lastName) => {
        const first = firstName?.[0] || ''
        const last = lastName?.[0] || ''
        return (first + last).toUpperCase()
    }

    return (
        <div 
            className={`${styles.userChat} ${styles[theme]} ${isActive ? styles.active : ''}`}
            onClick={() => updateCurrentChat(chat)}
            role="button"
            tabIndex={0}
        >
            <div className={styles.avatar}>
                {getInitials(recipientUser?.FirstName, recipientUser?.LastName)}
            </div>
            <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                    <span className={styles.userName}>
                        {`${recipientUser?.FirstName || ''} ${recipientUser?.LastName || ''}`}
                    </span>
                    <span className={styles.timestamp}>
                        {chat?.updatedAt ? moment(chat.updatedAt).format('HH:mm') : ''}
                    </span>
                </div>
                <div className={styles.chatPreview}>
                    <span className={styles.lastMessage}>Text Message</span>
                    {chat?.unreadCount > 0 && (
                        <span className={styles.unreadBadge}>{chat.unreadCount}</span>
                    )}
                </div>
            </div>
            <span className={styles.onlineIndicator}></span>
        </div>
    );
}

export default Userchat;
