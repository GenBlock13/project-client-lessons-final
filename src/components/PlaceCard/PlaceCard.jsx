import cls from './PlaceCard.module.scss'
import { ReactComponent as DelSvg } from '../../assets/close.svg'
import { ReactComponent as EditSvg } from '../../assets/edit.svg'
import { Button, buttonType, AppImage } from '../'
import { useStore } from '../../store/StoreProvider'
import { useNavigate } from 'react-router-dom'

export const PlaceCard = ({children, imgUrl, alt, placeId, update}) => {
  const { authStore, placeStore } = useStore()
  const navigate = useNavigate()

  const onClickNavigate = () => {
    navigate(`/places/${placeId}`)
  }
  
  const onClickEdit = (e) => {
    e.stopPropagation()
    navigate(`/places/${placeId}/edit`)
  }

  const onClickDelete = (e) => {
    e.stopPropagation()
    placeStore.deletePlaceById(placeId)
    update(placeId)
  }

  return (
    <div onClick={onClickNavigate} className={cls.placeCard}>
        <AppImage className={cls.img} src={imgUrl} alt={alt} />
         {
            authStore.user.role === 'ADMIN' && 
            <div className={cls.edit}>
              <Button onClick={onClickEdit} variant={buttonType.CLEAR}><EditSvg /></Button>
              <Button onClick={onClickDelete} variant={buttonType.CLEAR}><DelSvg /></Button>
            </div>
         }
        <div className={cls.title}>
          {children}
        </div>
    </div>
  )
}
