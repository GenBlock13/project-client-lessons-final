import cls from './ImageUploadedPanel.module.scss'
import { Text, ImageUploaded } from '../'

export const ImageUploadedPanel = ({imgUploaded, galleryUploaded}) => {
  return (
    <div className={cls.uploadedPanel}>
        <Text title='Загруженное превью' size='s'/>
        <ImageUploaded files={imgUploaded && imgUploaded} />
        <Text title='Загруженная галерея' size='s'/>
        <ImageUploaded files={galleryUploaded} />
    </div>
  )
}
