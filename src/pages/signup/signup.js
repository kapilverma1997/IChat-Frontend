import { useContext, useEffect } from "react";
import Button from "../../components/Button/button";
import InputBox from "../../components/InputBox/InputBox";
import { AuthContext } from "../../context/AuthContext";
import styles from "./../login/login.module.css"
import { postRequest } from "./../../utils/utils"
import { useNavigate } from "react-router-dom"

export default function Signup() {

    const navigate = useNavigate()
    const { signUpInfo, errorMessage, setErrorMessage, setSignUpInfo } = useContext(AuthContext)
    const handleSubmit = async () => {
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
    }

    useEffect(() => {
        setErrorMessage(undefined)
    }, []);

    return (
        <>
            <div className={styles.body}>
                <form className={styles.loginContainer}>

                    <h2>Create new account</h2>
                    <div className={styles.formgroup}>
                        <InputBox name="FirstName" placeholder="First Name" type="text" onChange={handleChange} />
                    </div>
                    <div className={styles.formgroup}>
                        <InputBox name="LastName" placeholder="Last Name" type="text" onChange={handleChange} />
                    </div>
                    <div className={styles.formgroup}>
                        <InputBox name="EmailAddress" placeholder="Email Address" type="text" onChange={handleChange} />
                    </div>
                    <div className={styles.formgroup}>
                        <InputBox name="Gender" placeholder="Gender" type="text" onChange={handleChange} />
                    </div>
                    <div className={styles.formgroup}>
                        <InputBox name="Password" placeholder="Password" type="password" onChange={handleChange} />
                    </div>
                    <div className={styles.formgroup}>
                        <Button buttonText="Submit" onClick={handleSubmit} />
                        {
                            errorMessage && <p>{errorMessage}</p>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}