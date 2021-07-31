import axios from "axios";
const token = localStorage.getItem('login');

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers:{"Authorization": "Bearer "+token, "Range":"Bytes=0-"}
});

export default api;