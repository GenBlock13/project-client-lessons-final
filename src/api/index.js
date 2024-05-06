import axios from 'axios'

// базовый адрес маршрута на сервере
export const API_URL = 'http://localhost:5000/api'

// объект запроса на сервер 
const $api = axios.create({
    // поле для разрешения работы с coockie
    withCredentials: true,
    // поле с базовым адресом
    baseURL: API_URL
})

// функция-перехватчик запроса на сервер
$api.interceptors.request.use((config) => {
    if (config.headers === undefined) {
      config.headers = {}
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

// функция-перехватчик ответа с сервера
// которая отлавливает статус 401
$api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true
    try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken)
        return $api.request(originalRequest) 
      } catch (e) {
        console.log('Не авторизован', e)
      }
  }
  throw error
})

export default $api


