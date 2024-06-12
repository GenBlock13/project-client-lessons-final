import $api from '../api'

export class CommentService {
  static async getComments() {
    return $api.get('/comments')
  }

  static async getComment(commentId) {
    return $api.get(`/comments/${commentId}`)
  }

  static async createComment(text) {
    return $api.post('/comments', {
      text,
    })
  }

  static async updateComment(commentId, text) {
    return $api.patch(`/comments/${commentId}`, {
      text,
    })
  }

  static async deleteComment(commentId) {
    return $api.delete(`/comments/${commentId}`)
  }
}
