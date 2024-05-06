import $api from '../api'

export class AuthService {
    // авторизация пользователя
    static async login(email, password) {
        // POST запрос: первый параметр - маршрут, второй параметр - тело запроса
        return $api.post('/auth/login', {
            email,
            password
        })
    }

    // регистрация пользователя
    static async registration(name, email, password) {
        return $api.post('/auth/registration', {
            name,
            email,
            password
        })
    }

    // выход из приложения
    static async logout() {
        return $api.post('/auth/logout')
    }
}
