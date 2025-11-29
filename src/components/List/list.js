import styles from "../List/list.module.css"

export default function List({ messages }) {

    const messagesList = messages?.map((item, index) => {
        return <li className={styles.list} key={index}>{item.message}</li>
    })

    return (
        <div className={styles.listContainer}>
            <ul className={styles.scrollableList}>{messagesList}</ul>
        </div>

    )

}