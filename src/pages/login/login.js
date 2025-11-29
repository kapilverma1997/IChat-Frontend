import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { postRequest } from "../../utils/utils";
import styles from "./login.module.css"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext";
import Logo from "../../components/Logo/Logo";

export default function Login() {

    const navigate = useNavigate()
    const { loginInfo, setLoginInfo, errorMessage, setErrorMessage, setUser } = useContext(AuthContext)
    const { theme } = useTheme()

    useEffect(() => {
        setErrorMessage(undefined)
    }, [setErrorMessage]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await postRequest("/api/users/login", loginInfo)
            if (response.error) return setErrorMessage(response.message)
            localStorage.setItem("User", JSON.stringify(response?.data?.user))
            setUser(response?.data?.user)
            navigate('/chatpage')
        } catch (error) {
            console.log('Login failed', error)
        }
    }

    const handleChange = (e) => {
        setLoginInfo((prev) => {
            const { name, value } = e.target
            let obj = { ...prev, [name]: value }
            return obj
        })
    }

    const handleSignup = () => { navigate('/Signup') }

    const handleSocialLogin = (provider) => {
        // Placeholder for social login functionality
        console.log(`Login with ${provider}`);
    }

    return (
        <div className={`${styles.body} ${styles[theme]}`}>
            <div className={styles.backgroundGradient}></div>
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.logoWrapper}>
                        <Logo size="large" showIcon={true} />
                    </div>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to continue to your account</p>

                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.formgroup}>
                            <label className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                name="EmailAddress"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                        <div className={styles.formgroup}>
                            <label className={styles.label}>Password</label>
                            <input
                                type="password"
                                name="Password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                        <button type="submit" className={styles.primaryButton}>
                            Sign In
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>Or continue with</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button
                            type="button"
                            className={styles.socialButton}
                            onClick={() => handleSocialLogin('Google')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            className={styles.socialButton}
                            onClick={() => handleSocialLogin('Microsoft')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M11.4 11.4H1V1h10.4v10.4z" fill="#F25022" />
                                <path d="M23 11.4H12.6V1H23v10.4z" fill="#7FBA00" />
                                <path d="M11.4 23H1V12.6h10.4V23z" fill="#00A4EF" />
                                <path d="M23 23H12.6V12.6H23V23z" fill="#FFB900" />
                            </svg>
                            Microsoft
                        </button>
                    </div>

                    <div className={styles.signupLink}>
                        Don't have an account? <button type="button" onClick={handleSignup} className={styles.linkButton}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}