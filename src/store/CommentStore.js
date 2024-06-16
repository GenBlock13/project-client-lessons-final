import { makeAutoObservable } from 'mobx'
import { CommentService } from '../services/CommentService'
import { errorsHandler } from '../utils/errorsHandler'

export class CommentStore {
  comments = []
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setComments(comment) {
    this.comments.push(comment)
  }

  setLoading(bool) {
    this.isLoading = bool
  }

  async createComment(text) {
    try {
      const response = await CommentService.createComment(
        text
      )
      console.log(response.data)
      this.setComments(response.data)
      return response.data
    } catch (e) {
      return errorsHandler(e.response.data)
    }
  }

  async getComments() {
    try {
      this.setLoading(true)
      const response = await CommentService.getComments()
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }

  async getCommentById(id) {
    try {
      this.setLoading(true)
      const response = await CommentService.getComment(id)
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }

  async deleteCommentById(id) {
    try {
      const response = await CommentService.deleteComment(id)
      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }

  async updateComment(id, text) {
    try {
      const response = await CommentService.updateComment(
        id,
        text
      )
      return response.data
    } catch (e) {
      return errorsHandler(e.response.data)
    } finally {
      this.setLoading(false)
    }
  }
}
