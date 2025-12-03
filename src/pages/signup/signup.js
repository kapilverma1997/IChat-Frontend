import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./../login/login.module.css"
import { postRequest } from "./../../utils/utils"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext";
import Logo from "../../components/Logo/Logo";

export default function Signup() {

    const navigate = useNavigate()
    const { signUpInfo, errorMessage, setErrorMessage, setSignUpInfo } = useContext(AuthContext)
    const { theme } = useTheme()
    const [fieldErrors, setFieldErrors] = useState({})

    const validate = (values) => {
        const errors = {}

        if (!values?.FirstName) errors.FirstName = 'First name is required'
        if (!values?.LastName) errors.LastName = 'Last name is required'

        if (!values?.EmailAddress) {
            errors.EmailAddress = 'Email is required'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(values.EmailAddress)) {
                errors.EmailAddress = 'Please enter a valid email address'
            }
        }

        if (!values?.PhoneNumber) {
            errors.PhoneNumber = 'Phone number is required'
        }

        if (!values?.Country) {
            errors.Country = 'Country is required'
        }

        if (!values?.Gender) {
            errors.Gender = 'Gender is required'
        }

        if (!values?.Password) {
            errors.Password = 'Password is required'
        } else {
            if (values.Password.length < 8) {
                errors.Password = 'Password must be at least 8 characters'
            } else if (!/[A-Z]/.test(values.Password) || !/[0-9]/.test(values.Password)) {
                errors.Password = 'Must include at least 1 uppercase letter and 1 number'
            }
        }

        if (!values?.ConfirmPassword) {
            errors.ConfirmPassword = 'Confirm your password'
        } else if (values.Password !== values.ConfirmPassword) {
            errors.ConfirmPassword = 'Passwords do not match'
        }

        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const currentValues = signUpInfo || {}
        const errors = validate(currentValues)
        setFieldErrors(errors)

        if (Object.keys(errors).length > 0) {
            setErrorMessage('Please fix the highlighted errors and try again.')
            return
        }

        setErrorMessage(undefined)
        try {
            const response = await postRequest("/api/users/register", signUpInfo)
            if (response.error) return setErrorMessage(response?.message)
            navigate("/")
        } catch (error) {
            console.error('Signup failed:', error)
        }
    }

    const handleChange = (e) => {
        setSignUpInfo((prev) => {
            const { name, value } = e.target
            let obj = { ...prev, [name]: value }
            return obj
        })

        setFieldErrors((prev) => ({
            ...prev,
            [e.target.name]: undefined
        }))
    }

    useEffect(() => {
        setErrorMessage(undefined)
    }, [setErrorMessage]);

    const handleLoginNavigate = () => {
        navigate('/')
    }

    return (
        <div className={`${styles.body} ${styles[theme]}`}>
            <div className={styles.backgroundGradient}></div>
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.logoWrapper}>
                        <Logo size="large" showIcon={true} />
                    </div>
                    <h1 className={styles.title}>Create your account</h1>
                    <p className={styles.subtitle}>Join us by filling in the information below</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formgroup}>
                            <label className={styles.label}>First Name</label>
                            <input
                                type="text"
                                name="FirstName"
                                placeholder="Enter your first name"
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {fieldErrors.FirstName && <div className={styles.errorMessage}>{fieldErrors.FirstName}</div>}
                        </div>

                        <div className={styles.formgroup}>
                            <label className={styles.label}>Last Name</label>
                            <input
                                type="text"
                                name="LastName"
                                placeholder="Enter your last name"
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {fieldErrors.LastName && <div className={styles.errorMessage}>{fieldErrors.LastName}</div>}
                        </div>

                        <div className={styles.formgroup}>
                            <label className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                name="EmailAddress"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {fieldErrors.EmailAddress && <div className={styles.errorMessage}>{fieldErrors.EmailAddress}</div>}
                        </div>

                        <div className={styles.formgroup}>
                            <label className={styles.label}>Phone Number</label>
                            <input
                                type="tel"
                                name="PhoneNumber"
                                placeholder="Enter your phone number"
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {fieldErrors.PhoneNumber && <div className={styles.errorMessage}>{fieldErrors.PhoneNumber}</div>}
                        </div>

                        <div className={styles.formgroup}>
                            <label className={styles.label}>Country</label>
                            <input
                                type="text"
                                name="Country"
                                placeholder="Enter your country"
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {fieldErrors.Country && <div className={styles.errorMessage}>{fieldErrors.Country}</div>}
                        </div>

                        <div className={styles.formgroup}>
                            <label className={styles.label}>Gender</label>
                            <select
                                name="Gender"
                                onChange={handleChange}
                                className={styles.input}
                                defaultValue=""
                            >
                                <option value="" disabled>Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                            {fieldErrors.Gender && <div className={styles.errorMessage}>{fieldErrors.Gender}</div>}
                        </div>

                        <div className={styles.formgroup}>
                            <label className={styles.label}>Password</label>
                            <input
                                type="password"
                                name="Password"
                                placeholder="Create a password"
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {fieldErrors.Password && <div className={styles.errorMessage}>{fieldErrors.Password}</div>}
                        </div>

                        <div className={styles.formgroup}>
                            <label className={styles.label}>Confirm Password</label>
                            <input
                                type="password"
                                name="ConfirmPassword"
                                placeholder="Re-enter your password"
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {fieldErrors.ConfirmPassword && <div className={styles.errorMessage}>{fieldErrors.ConfirmPassword}</div>}
                        </div>

                        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

                        <button type="submit" className={styles.primaryButton}>
                            Create Account
                        </button>
                    </form>

                    <div className={styles.signupLink}>
                        Already have an account?
                        <button type="button" onClick={handleLoginNavigate} className={styles.linkButton}>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}