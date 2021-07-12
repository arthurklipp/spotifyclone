import axios from "axios";
const teste = localStorage.getItem('login');

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers:{"Authorization": "Bearer "+teste}
});

export default api;