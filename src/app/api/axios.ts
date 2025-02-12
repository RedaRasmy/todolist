import axios from 'axios'

export default axios.create({
    baseURL:"https://todolistapi-x6us.onrender.com"
    // baseURL: "http://localhost:3500"
})