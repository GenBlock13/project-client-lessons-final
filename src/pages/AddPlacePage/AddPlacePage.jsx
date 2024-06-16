import { useState, useCallback, useMemo, useEffect } from 'react'
import { 
  Container,
  Input,
  Button,
  buttonType,
  Text,
  LinkButton,
  ImagePanel,
  ImageUploadedPanel 
} from '../../components'
import cls from './AddPlacePage.module.scss'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import $api, {API_URL} from '../../api'
import { useStore } from '../../store/StoreProvider'
import { useParams } from 'react-router-dom'

export const AddPlacePage = () => {
  const { placeStore } = useStore()
  const [valueEditor, setValueEditor] = useState('') 
  const [title, setTitle] = useState('')
  const [img, setImg] = useState('')
  const [gallery, setGallery] = useState([])
  const [isNewPlace, setIsNewPlace] = useState(false)
  const [placeId, setPlaceId] = useState(null)
  const { id } = useParams()
  const [imgUploaded, setImgUploaded] = useState('')
  const [galleryUploaded, setGalleryUploaded] = useState([])
  const [errorsMessage, setErrorsMessage] = useState([])

  const isEditing = Boolean(id)

  useEffect(() => {
    if (id) {
      placeStore.getPlaceById(id).then(res => {
        setTitle(res?.title)
        setValueEditor(res?.text)
        setImgUploaded(res?.thumbnail)
        setGalleryUploaded(res?.gallery)
      })
    }
  }, [])
  
  const submitPlace = async () => {
    try {
        const formData = new FormData()
        img ? formData.append('thumbnail', img) : formData.append('thumbnail', imgUploaded)
        
        if (gallery?.length > 0) { gallery.map((file) => 
          formData.append('gallery', file)
        )}
        
        if (galleryUploaded?.length > 0) { galleryUploaded.map((file) => 
          formData.append('gallery', file)
        )}

        const { data } = (formData.has('thumbnail') || formData.has('gallery'))
                          && await $api.post(`${API_URL}/upload/images`, formData)

        const res = isEditing ? await placeStore.updatePlace(
          id,
          title, 
          valueEditor, 
          formData?.has('gallery') ? data?.galleryUrl : galleryUploaded,
          formData?.has('thumbnail') ? data?.thumbUrl : imgUploaded,
          ) : await placeStore.createPlace(title, valueEditor, data.galleryUrl, data.thumbUrl)  
          
        if (res instanceof Array) {
          setErrorsMessage([])
          res.map(err => setErrorsMessage(prev => [...prev, err]))
          setIsNewPlace(false)
        } else {
          setIsNewPlace(true)
        }
              
        const places = await placeStore.getPlaces()

        isEditing ? setPlaceId(id) : setPlaceId(places[0].id)
      } catch (error) {
        console.warn(error)
      }
    }

  const onChangeEditor = useCallback((value) => {
    setValueEditor(value)
  }, [])

  const onChangeTitle = useCallback((value) => {
    setTitle(value)
  }, [])

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      maxHeight: '400px',
      placeholder: 'Описание достопримечательности...',
      status: false,
      hideIcons: ['fullscreen', 'side-by-side'],
      forceSync: true
    }
  }, [])

  return (
      <div className={cls.addPlaceInner}>
        <Container>  
            <Text 
              title={isEditing ? 'Редактировать достопримечательность' : 'Добавить достопримечательность'} 
              size='m'
            />
              { errorsMessage?.length > 0 
                  && 
                errorsMessage.map(err => 
                  <Text key={err} title={err} size='s' align='left' color='error' />) 
              }
            
            <br />      
            <Input
              className={cls.input}
              placeholder='Название достопримечательности...'
              value={title}
              onChange={onChangeTitle}
            />
            <SimpleMDE 
              className={cls.editor}
              value={valueEditor}
              onChange={onChangeEditor}
              options={options} 
            />
            { isEditing && <ImageUploadedPanel imgUploaded={imgUploaded} galleryUploaded={galleryUploaded} /> }
            <ImagePanel setImg={setImg} setGallery={setGallery} gallery={gallery} isEditing={isEditing} />
            <div className={cls.buttons}>
              <Button onClick={submitPlace} variant={buttonType.FILLED}>
                {isEditing ? 'Сохранить' : 'Опубликовать'}
              </Button>
              <LinkButton to={'/#places'} variant={buttonType.GRADIENT}>Отмена</LinkButton>
              {isNewPlace &&
                <LinkButton 
                  to={`/places/${isEditing ? id : placeId}`}
                  variant={buttonType.FILLED}>
                    Посмотреть созданную достопримечательность
                </LinkButton>
              }
            </div>
        </Container>
      </div>
  )
}
