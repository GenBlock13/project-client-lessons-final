import { makeAutoObservable } from 'mobx'
import { AuthService } from '../services/AuthService'
import axios from 'axios'
import { API_URL } from '../api'

export class AuthStore {
    // Поле, в котором будут сохранятся данные о пользователе
    // по умолчанию пустой объект {}
    user = {}
    // Поле, которое показывает, авторизован пользователь или нет
    // по умолчанию не авторизован {false}
    isAuth = false
    // поле загрузки
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    // метод, меняющий флаг isAuth
    setAuth(bool) {
        this.isAuth = bool
    }

    // метод, меняющий данные о пользователе
    setUser(user) {
        this.user = user
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    // метод для авторизации
    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    // метод для регистрации
    async registration(name, email, password) {
        try {
            const response = await AuthService.registration(name, email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.message)
        }
    }

    // метод для выхода из приложения
    async logout() {
        try {
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log((e).message)
        }
    }

    // метод проверки авторизации
    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }
}
