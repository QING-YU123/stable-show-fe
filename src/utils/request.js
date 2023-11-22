import axios from "axios";

const request = axios.create({
    baseURL: "http://8.130.40.44:3002",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
})

export default request