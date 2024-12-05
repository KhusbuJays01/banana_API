import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8000/api`,
    mode: 'no-cors',
    // headers: {
    //      "Content-Type": "application/json",
    //      "Accept": "application/json",
    // }
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token')
        window.location.reload();
        // router.navigate('/login')
        return error;
    }
    throw error;
})

export default axiosClient;