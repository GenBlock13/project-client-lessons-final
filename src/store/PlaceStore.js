import { makeAutoObservable } from 'mobx'
import { PlaceService } from '../services/PlaceService'

export class PlaceStore {
  places = []
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setPlaces(place) {
    this.places.push(place)
  }

  setLoading(bool) {
    this.isLoading = bool
  }

  // асинхронный экшен
  // метод для создания достопримечательности
  async createPlace(title, text, gallery, thumbnail) {
    try {
      const response = await PlaceService.createPlace(
        title,
        text,
        gallery,
        thumbnail
      )
      console.log(response)
      this.setPlaces(response.data.place)
    } catch (e) {
      console.log(e.message)
    }
  }

  // получить все достопримечательности
  async getPlaces() {
    try {
      this.setLoading(true)
      const response = await PlaceService.getPlaces()
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }

  // получить одну достопримечательность
  async getPlaceById(id) {
    try {
      this.setLoading(true)
      const response = await PlaceService.getPlace(id)
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }

  // удалить достопримечательность
  async deletePlaceById(id) {
    try {
      const response = await PlaceService.deletePlace(id)
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }
}
