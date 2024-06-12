import { Button, Text, buttonType } from '../'
import { useStore } from '../../store/StoreProvider'
import cls from './CommentCard.module.scss'
import { ReactComponent as DelSvg } from '../../assets/close.svg'
import { ReactComponent as EditSvg } from '../../assets/edit.svg'

export const CommentCard = ({ id, userId, text, username, update, modalEdit }) => {
    const {authStore, commentStore} = useStore()

    const onClickEdit = () => {
        modalEdit(id)
    }

    const onClickDelete = () => {
        commentStore.deleteCommentById(id)
        update(id)
    }

    return (
        <div className={cls.commentCard}>
            <div className={cls.header}>
                <Text className={cls.username} title={username} size='s' bold color='white' />
                {
                    authStore.user.role === 'USER' && authStore.user.id === userId &&
                    <div className={cls.edit}>
                        <Button onClick={onClickEdit} variant={buttonType.CLEAR}><EditSvg /></Button>
                        <Button onClick={onClickDelete} variant={buttonType.CLEAR}><DelSvg /></Button>
                    </div>
                }
            </div>
            <div className={cls.comment}>
                {text}
            </div>
        </div>
    )
}
