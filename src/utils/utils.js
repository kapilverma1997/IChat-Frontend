import axios from "axios"

export const axios_ = axios.create({
    baseURL: "http://localhost:3003",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const postRequest = async (url, body) => {
    try {
        const response = await axios_.post(url, body)
        return response.data
    } catch (error) {
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            const message = error.response?.data?.message || error.response?.data?.error || 'An error occurred'
            return { error: true, message }
        } else if (error.request) {
            // Request was made but no response received
            if (error.code === 'ECONNABORTED') {
                return { error: true, message: 'Request timed out. Please try again.' }
            }
            return { error: true, message: 'Cannot connect to server. Please check if the backend is running.' }
        } else {
            // Something else happened
            return { error: true, message: error.message || 'An unexpected error occurred' }
        }
    }
}

export const getRequest = async (url) => {
    try {
        const response = await axios_.get(url)
        return response.data
    } catch (error) {
        const message = error?.response?.data?.message
        return { error: true, message }
    }
}

export const deleteRequest = async (url) => {
    try {
        const response = await axios_.delete(url)
        return response.data
    } catch (error) {
        const message = error?.response?.data?.message
        return { error: true, message }
    }
}