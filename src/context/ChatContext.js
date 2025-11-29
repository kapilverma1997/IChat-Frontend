import { createContext, useCallback, useEffect, useState } from "react"
import { getRequest, postRequest, deleteRequest } from "../utils/utils";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [chatErrorMessage, setChatErrorMessage] = useState(null)
    const [potentialChats, setPotentialChats] = useState(null)
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const getMessages = async () => {
            if (!currentChat?._id) {
                setMessages([])
                return
            }
            const response = await getRequest(`/api/messages/${currentChat?._id}`)
            if (response.error) {
                console.log('Error fetching messages', response)
                setMessages([])
                return
            }
            setMessages(response?.data || [])
        }
        getMessages()
    }, [currentChat]);

    const updateCurrentChat = (chat) => {
        console.log('UPDATING CURRENT CHAT AS ', chat);
        setCurrentChat(chat)
    }

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest("/api/users")
            if (response.error) {
                return console.log("Error fetching users is", response)
            }

            const pChats = response?.data?.filter((u) => {
                let isChatCreated = false
                if (user?._id === u?._id) return false

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat?.members[0] === u?._id || chat?.members[1] === u?._id
                    })
                }
                return !isChatCreated
            })
            setPotentialChats(pChats)
        }
        getUsers()
    }, [userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            const userId = user?._id
            if (userId) {
                try {
                    const response = await getRequest(`/api/chats/${userId}`)
                    if (response.error) {
                        setChatErrorMessage(response.message)
                        setUserChats([]) // Set empty array on error
                    } else {
                        // Ensure we set an array even if response.data is null/undefined
                        setUserChats(response?.data || [])
                    }
                } catch (error) {
                    console.error('Error fetching user chats:', error)
                    setChatErrorMessage('Failed to load chats')
                    setUserChats([])
                }
            } else {
                // Reset chats when user is not available
                setUserChats(null)
            }
        }
        getUserChats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?._id]); // Re-fetch when user ID changes (user object reference may change)

    const sendTextMessage = useCallback(async (chatID, senderID, text, setTextMessage) => {
        if (!text) return console.log(`You must type something...`)
        console.log('response in sendtextmessages', chatID, senderID, text);

        const response = await postRequest(`/api/messages`, {
            chatID,
            senderID,
            text
        })
        console.log('response in sendtextmessages', response);
        if (response.error) {
            console.log('Error sending messages', response.message)
            return
        }
        // Clear the input after successful send
        setTextMessage("")
        // Update messages with the new message
        setMessages((prev) => prev ? [...prev, response.data] : [response.data])
    }, [])

    const createChat = useCallback(async (firstID, secondID) => {
        const newChat = JSON.stringify({ firstID, secondID })
        const response = await postRequest("/api/chats", newChat)

        if (response.error) {
            return console.log('Error while creating chats', response.message)
        }
        setUserChats((prev) => [...prev, response.data])
    }, [])

    const deleteChat = useCallback(async (chatID) => {
        const response = await deleteRequest(`/api/chats/${chatID}`)

        if (response.error) {
            console.log('Error deleting chat', response.message)
            return { error: true, message: response.message }
        }

        // Remove chat from userChats
        setUserChats((prev) => prev ? prev.filter(chat => chat._id !== chatID) : [])

        // If the deleted chat was the current chat, clear it
        if (currentChat?._id === chatID) {
            setCurrentChat(null)
            setMessages([])
        }

        return { success: true }
    }, [currentChat])

    return <ChatContext.Provider value={{
        userChats, chatErrorMessage, setChatErrorMessage, potentialChats, createChat, updateCurrentChat, messages, currentChat, sendTextMessage, deleteChat
    }}>
        {children}
    </ChatContext.Provider>

}