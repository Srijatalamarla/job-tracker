import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        //401 - for invalid credentials - on auth routes
        const isAuthRoute = error.config?.url?.includes('/auth/')

        //if token expires
        if(error.response?.status === 401 && !isAuthRoute) {
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await axios.post('http://localhost:8080/auth/refresh', {refreshToken})
                error.config.headers.Authorization = `Bearer ${response.data.token}`
                localStorage.setItem('token', response.data.token)
                return axiosInstance(error.config)
            }catch(e) {    
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance