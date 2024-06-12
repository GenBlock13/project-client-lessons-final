import { AppImage, Text } from '../'
import cls from './ImageUploaded.module.scss'
import { SERVER_URL } from '../../api'

export const ImageUploaded = ({files}) => {
  const arrFiles = typeof files === 'string' ? files.split(' ') : files
  if (arrFiles === null) {
    return (
      <Text text='Загруженных фотографий пока нет' color='gray' />
    )
  }
  
  return (
    <div className={cls.imgBox}>
        {arrFiles?.map(file => <AppImage key={file} className={cls.appImg} src={`${SERVER_URL}/${file}`} />)}
    </div>
  )
}
