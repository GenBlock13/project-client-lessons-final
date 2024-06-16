import { makeAutoObservable } from 'mobx'
import { FactService } from '../services/FactService'
import { errorsHandler } from '../utils/errorsHandler'

export class FactStore {
  facts = []
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setFacts(fact) {
    this.facts.push(fact)
  }

  setLoading(bool) {
    this.isLoading = bool
  }

  // метод для создания факта
  async createFact(title, text, img) {
    try {
      const response = await FactService.createFact(
        title,
        text,
        img
      )
      console.log(response)
      this.setFacts(response.data.fact)
    } catch (e) {
      return errorsHandler(e.response.data)
    }
  }

  // получить все факты
  async getFacts() {
    try {
      this.setLoading(true)
      const response = await FactService.getFacts()
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }

  // получить факт
  async getFactById(id) {
    try {
      this.setLoading(true)
      const response = await FactService.getFact(id)
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }

  // удалить факт
  async deleteFactById(id) {
    try {
      const response = await FactService.deleteFact(id)
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }

  // изменить факт
  async updateFact(id, title, text, img) {
    try {
      const response = await FactService.updateFact(
        id,
        title,
        text,
        img
      )
      return response.data
    } catch (e) {
      return errorsHandler(e.response.data)
    } finally {
      this.setLoading(false)
    }
  }
  
}
