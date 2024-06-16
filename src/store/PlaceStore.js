import { makeAutoObservable } from 'mobx'
import { PlaceService } from '../services/PlaceService'
import { errorsHandler } from '../utils/errorsHandler'

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
      return errorsHandler(e.response.data)
    }
  }

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

  async updatePlace(placeId, title, text, gallery, thumbnail) {
    try {
      const response = await PlaceService.updatePlace(
        placeId,
        title,
        text,
        gallery,
        thumbnail
      )
      return response.data
    } catch (e) {
      return errorsHandler(e.response.data)
    } finally {
      this.setLoading(false)
    }
  }
  
}
