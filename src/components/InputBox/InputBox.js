import styles from "./InputBox.module.css"

export default function InputBox({ name, placeholder, type, onChange }) {

    return (
        <div className={styles.inputContainer}>
            <input type={type} name={name} placeholder={placeholder} onChange={onChange}></input>
        </div>
    )
}