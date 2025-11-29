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
        const message = error?.response?.data?.message
        return { error: true, message }
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