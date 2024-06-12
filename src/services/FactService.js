import $api from '../api'

export class FactService {
  // получение всех фактов
    static async getFacts() {
        return $api.get('/facts')
    }
    // получение факта по id
    static async getFact(factId) {
        return $api.get(`/facts/${factId}`)
    }
    // создание факта
    static async createFact(title, text, img) {
        return $api.post('/facts', {
          title,
          text,
          img
        })
    }
    // изменение факта по id
    static async updateFact(factId, title, text, img) {
        return $api.patch(`/facts/${factId}`, {
          title,
          text,
          img,
        })
    }
    // удаление факта по id
    static async deleteFact(factId) {
        return $api.delete(`/facts/${factId}`)
    }
}
