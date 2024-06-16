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
  const [errorsMessage, setErrorsMessage] = useState([])

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
    setErrorsMessage([])
  }

  const onCloseEditModal = () => {
    setIsEditCommentModal(false)
    setErrorsMessage([])
  }

  const onSubmitComment = async () => {
    setErrorsMessage([])
    if (!comment) {
      setErrorsMessage(prev => [...prev, 'Напишите что-нибудь'])
      return
    }
    const res = await commentStore.createComment(comment)
    if (res instanceof Array) {
        res.map(err => setErrorsMessage(prev => [...prev, err]))
        return
    }
    setComments(prev => [res, ...prev])
    setIsCommentModal(false)
    setComment('')
    setErrorsMessage([])
  }

  const onEditComment = async () => {
    setErrorsMessage([])
    if (!comment && !editComment.text) {
      setErrorsMessage(prev => [...prev, 'Напишите что-нибудь'])
      return
    }
    const res = await commentStore.updateComment(editComment.id, editComment.text ? editComment.text : comment)
    if (res instanceof Array) {
        res.map(err => setErrorsMessage(prev => [...prev, err]))
        return
    }
    setComments(comments.map(comment => comment.id === res.id ? {...comment, text: res.text} : comment))
    setIsEditCommentModal(false)
    setEditComment('')
    setErrorsMessage([])
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
      <div key={Math.random()} className={cls.commentsList}>
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
              <div>
              { errorsMessage?.length > 0 
                && 
                errorsMessage.map(err => 
                  <Text key={err} title={err} size='s' align='left' color='error' />) 
              }
              </div>
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
              <div>
              { errorsMessage?.length > 0 
                && 
                errorsMessage.map(err => 
                  <Text key={err} title={err} size='s' align='left' color='error' />) 
              }
              </div>
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
