import { useState, useEffect } from 'react'
import { Section, Text, Button, buttonType, Modal, Textarea, CommentCard } from '../'
import cls from './Comments.module.scss'
import { useStore } from '../../store/StoreProvider'

export const Comments = () => {
  const {authStore, commentStore} = useStore()
  const [isCommentModal, setIsCommentModal] = useState(false)
  const [isEditCommentModal, setIsEditCommentModal] = useState(false)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [editComment, setEditComment] = useState({})

  useEffect(() => {
    commentStore.getComments().then(data => setComments(data))
  }, [])

  const onShowModalComment = () => {
    setIsCommentModal(true)
  }

  const onShowModalEditComment = (commentId) => {
    commentStore.getCommentById(commentId).then(data => setEditComment(data))
    setIsEditCommentModal(true)
  }

  const onCloseModal = () => {
    setIsCommentModal(false)
  }

  const onCloseEditModal = () => {
    setIsEditCommentModal(false)
  }

  const onSubmitComment = () => {
      commentStore.createComment(comment).then(data => setComments([...comments, data]))
      setIsCommentModal(false)
  }

  const onEditComment = () => {
    commentStore.updateComment(editComment.id, editComment.text ? editComment.text : comment)
      .then(data => setComments(comments.map(comment => comment.id === data.id ? {...comment, text: data.text} : comment)))
    setIsEditCommentModal(false)
  }

  const onChangeComment = (value) => {
    setComment(value)
  }

  const onChangeEditComment = (value) => {
    setEditComment({...editComment, text: value})
  }

  const updateCommentList = (commentId) => {
    const filteredComments = comments.filter(comment => comment.id !== commentId)
    setComments(filteredComments)
  }

  return (
    <Section className={cls.comments} id={'comments'}>
      <div className={cls.header}>
          <Text bold color='black' className={cls.title} title='Комментарии' size='s' align='left' />
          {
            authStore.user.role === 'USER' &&
            <Button 
              variant={ buttonType.FILLED }
              onClick={ onShowModalComment }
            >
              Добавить отзыв +
            </Button>
          }
      </div>
      <div className={cls.commentsList}>
        {comments && comments.map(comment => 
          <CommentCard 
            key={comment.id}
            text={comment.text}
            username={comment.username}
            userId={comment.userId}
            id={comment.id} 
            update={updateCommentList}
            modalEdit={onShowModalEditComment}
          />
          )
        }
      </div>      
      {isCommentModal && (
          <Modal
            isOpen={isCommentModal}
            onClose={onCloseModal}
          >
            <div className={cls.modalComment}>
              <Text title='Форма отправки комментария' size='s' />
              <Textarea onChange={onChangeComment} value={comment} placeholder='Напишите тут комментарий' />
              <Button 
                variant={ buttonType.GRADIENT }
                onClick={ onSubmitComment }
              >
                Добавить комментарий
              </Button>
            </div>
          </Modal>
        )
        }

        {isEditCommentModal &&
          (<Modal
            isOpen={isEditCommentModal}
            onClose={onCloseEditModal}
          >
            <div className={cls.modalComment}>
              <Text title='Изменить комментарий' size='s' />
              <Textarea onChange={onChangeEditComment} value={editComment.text} placeholder='Напишите тут комментарий' />
              <Button 
                variant={ buttonType.GRADIENT }
                onClick={ onEditComment }
              >
                Изменить комментарий
              </Button>
            </div>
          </Modal>)
        }
    </Section>
  )
}
