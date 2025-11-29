import styles from "./button.module.css"

export default function Button({
    buttonText,
    onClick
}) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick && onClick()
    }

    return (
        <div className={styles.buttonContainer}>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    )
}

Button.defaultProps = {
    onClick: () => { }
}