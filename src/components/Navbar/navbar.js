import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { useTheme } from "../../context/ThemeContext"
import styles from "./navbar.module.css"
import Logo from "../Logo/Logo"

export default function NavBar() {
    const { user, logoutUser } = useContext(AuthContext)
    const { theme } = useTheme()

    if (!user) {
        return null
    }

    return (
        <nav className={`${styles.navbar} ${styles[theme]}`}>
            <div className={styles.navContainer}>
                <Link to="/chatpage" className={styles.logo}>
                    <Logo size="medium" showIcon={true} />
                </Link>
                <button className={styles.logoutButton} onClick={logoutUser}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </nav>
    )
}
