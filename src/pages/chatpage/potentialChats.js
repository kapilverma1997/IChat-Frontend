import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import styles from "./potentialChats.module.css"

const PotentialChats = () => {
    const { potentialChats, createChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const { theme } = useTheme()

    if (!potentialChats || potentialChats.length === 0) {
        return null
    }

    return (
        <div className={`${styles.potentialChats} ${styles[theme]}`}>
            {potentialChats.map((u, index) => (
                <div 
                    key={index} 
                    className={styles.userChip}
                    onClick={() => createChat(user?._id, u?._id)}
                    role="button"
                    tabIndex={0}
                >
                    <span className={styles.onlineDot}></span>
                    {u.FirstName} {u.LastName}
                </div>
            ))}
        </div>
    )
}

export default PotentialChats