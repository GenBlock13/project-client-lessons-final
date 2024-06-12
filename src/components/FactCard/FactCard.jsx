import { AppImage, Button, buttonType, Text } from '../'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/StoreProvider'
import cls from './FactCard.module.scss'
import { ReactComponent as DelSvg } from '../../assets/close.svg'
import { ReactComponent as EditSvg } from '../../assets/edit.svg'

export const FactCard = ({children, imgUrl, alt, factId, update}) => {
    const { authStore, factStore } = useStore()
    const navigate = useNavigate()

    const onClickEdit = (e) => {
        e.stopPropagation()
        navigate(`/facts/${factId}/edit`)
    } 

    const onClickDelete = (e) => {
        e.stopPropagation()
        factStore.deleteFactById(factId)
        update(factId)
    }

    return (
        <div className={cls.contentFact}>
            <div className={cls.btns}>
                {
                    authStore.user.role === 'ADMIN' && 
                    <div className={cls.edit}>
                        <Button onClick={onClickEdit} variant={buttonType.CLEAR}><EditSvg /></Button>
                        <Button onClick={onClickDelete} variant={buttonType.CLEAR}><DelSvg /></Button>
                    </div>
                }
                <AppImage className={cls.img} src={imgUrl} alt={alt} />
            </div>
            <div className={cls.textFact}>
                {children}
            </div>
        </div>
    )
}
