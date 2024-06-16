import { makeAutoObservable } from 'mobx'
import { AuthService } from '../services/AuthService'
import axios from 'axios'
import { API_URL } from '../api'
import { errorsHandler } from '../utils/errorsHandler'

export class AuthStore {
    user = {}
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    setUserAndRole(response) {
        localStorage.setItem('token', response.data.accessToken)
        this.setAuth(true)
        this.setUser(response.data.user)
        const role = response.data.user.role
        if (role === 'ADMIN') {
            localStorage.setItem('roleAdmin', true)
        } else if (role === 'USER') {
            localStorage.setItem('roleUser', true)
        }
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            this.setUserAndRole(response)
        } catch (e) {
            return errorsHandler(e.response?.data)
        }
    }

    async registration(name, email, password) {
        try {
            const response = await AuthService.registration(name, email, password)
            console.log(response)
            this.setUserAndRole(response)
        } catch (e) {
            return errorsHandler(e.response?.data)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
            localStorage.removeItem('roleAdmin')
            localStorage.removeItem('roleUser')
        } catch (e) {
            console.log((e).message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            localStorage.removeItem('roleAdmin')
            localStorage.removeItem('roleUser')
            console.log(e.response?.data?.message)
        } 
        finally {
            this.setLoading(false)
        }
    }
}
