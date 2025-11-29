import styles from "./form.module.css"

export default function Form({ children }) {
    return (
        <div className={styles.formContainer}>
            <form>{children}</form>
        </div>
    )
}