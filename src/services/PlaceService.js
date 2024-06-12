import $api from '../api'

export class PlaceService {
  // получение всех достопримечательностей
    static async getPlaces() {
        return $api.get('/places')
    }
    // получение достопримечательности по id
    static async getPlace(placeId) {
        return $api.get(`/places/${placeId}`)
    }
    // создание достопримечательности
    static async createPlace(title, text, gallery, thumbnail) {
        return $api.post('/places', {
          title,
          text,
          gallery,
          thumbnail,
        })
    }
    // изменение достопримечательности по id
    static async updatePlace(placeId, title, text, gallery, thumbnail) {
        return $api.patch(`/places/${placeId}`, {
          title,
          text,
          gallery,
          thumbnail,
        })
    }
    // удаление достопримечательности по id
    static async deletePlace(placeId) {
        return $api.delete(`/places/${placeId}`)
    }
}
