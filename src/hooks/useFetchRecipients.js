import { useContext, useEffect, useState } from "react"
import { getRequest } from "../utils/utils"
import { ChatContext } from "../context/ChatContext"

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)
    const { currentChat } = useContext(ChatContext)

    const recipientID = chat?.members?.find((id) => id !== user?._id)

    useEffect(() => {
        const getUser = async () => {
            if (!recipientID) return null
            const response = await getRequest(`/api/users/${recipientID}`)
            if (response.error) {
                return setError(response.message)
            }
            setRecipientUser(response.data)
        }
        getUser()
    }, [currentChat]);

    return { recipientUser }

}