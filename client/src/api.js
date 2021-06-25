import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers:{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDMzYmNiNzJiMDM5MDk2NGE2M2UxYSIsImlhdCI6MTYyNDYzODE0OCwiZXhwIjoxNjI0NzI0NTQ4fQ._MnYN_suqR0W5265tT0Gb_4EfRemxKjr2wCPbFlCUiA"}
});

export default api;