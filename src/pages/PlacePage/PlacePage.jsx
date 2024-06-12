import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Loader, Text, AppImage } from '../../components'
import { useStore } from '../../store/StoreProvider'
import { SERVER_URL } from '../../api'
import cls from './PlacePage.module.scss'
import ReactMarkdown from 'react-markdown'

export const PlacePage = () => {
  const { placeId } = useParams()
  const { placeStore } = useStore()
  const [ place, setPlace ] = useState({})
  const { title, text, gallery, thumbnail } = place
  
  useEffect(() => {
    placeStore.getPlaceById(placeId).then(data => setPlace(data))
  }, [placeId, placeStore])

  if (placeStore.isLoading) {
    return <Loader />
  }
  
  return (
    <Container>
      <div className={cls.placeInner}>
        <Text bold color='black' title={title} size='m' align='center' />
        <div className={cls.placeContent}>
          {thumbnail && <AppImage className={cls.thumb} src={`${SERVER_URL}/${thumbnail}`} alt={title} />}
          <ReactMarkdown children={text}/>
        </div>
        <div className={cls.gallery}>
          {gallery?.map(img => <AppImage className={cls.galleryImg} key={img} src={`${SERVER_URL}/${img}`} alt={title} />)}
        </div>
      </div>
    </Container>
  )
}
