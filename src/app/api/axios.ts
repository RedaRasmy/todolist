import axios from 'axios'

// const baseURL = "https://todolistapi-x6us.onrender.com"
const baseURL = "http://localhost:3500"

export default axios.create({
    baseURL,
})

export const axiosPrivate =  axios.create({
    baseURL,
    headers : {
        "Content-Type" : "application/json"
    },
    withCredentials : true
})