import { useState, useCallback, useEffect } from 'react'
import { 
  Container,
  Text,
  Input,
  Textarea, 
  FilePicker,
  ImageUploaded,
  Button,
  buttonType,
  LinkButton
} from '../../components'
import { useParams } from 'react-router-dom'
import $api, {API_URL} from '../../api'
import { useStore } from '../../store/StoreProvider'
import cls from './AddFactPage.module.scss'

export const AddFactPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [imgUploaded, setImgUploaded] = useState('')
  const [isNewFact, setIsNewFact] = useState(false)
  const [img, setImg] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const { id } = useParams()
  const { factStore } = useStore()

  const isEditing = id

  useEffect(() => {
    if (id) {
      factStore.getFactById(id).then(res => {
        setTitle(res?.title)
        setText(res?.text)
        setImgUploaded(res?.img)
      })
    }
  }, [])
  
  const onChangeTitle = useCallback((value) => {
    setTitle(value)
  }, [])

  const onChangeText = useCallback((value) => {
    setText(value)
  }, [])

  function addImg(img) {
      setImg(img[0])
      setIsDisabled(true)
  }

  function removeImage() {
      setImg('')
      setIsDisabled(false)
  }

  const submitFact = async () => {
    try {
      const formData = new FormData()
      img ? formData.append('image', img) : formData.append('image', imgUploaded)

      const { data } = formData.has('image') && await $api.post(`${API_URL}/upload/image`, formData)
              
      isEditing ? await factStore.updateFact(
        id,
        title, 
        text, 
        formData.has('image') ? data?.url : imgUploaded,
        )
      : await factStore.createFact(title, text, data.url)

      console.log(imgUploaded)

      setIsNewFact(true)
      } catch (error) {
        console.warn(error)
      } 
  }
  
  return (
    <div className={cls.addFact}>
      <Container>
        <div className={cls.addFactInner}>
          <Text title={isEditing ? 'Изменить факт' : 'Добавить факт'} size='m'/>       
          <Input
            className={cls.input}
            placeholder='Название факта...'
            value={title}
            onChange={onChangeTitle}
          />
          <Textarea value={text} placeholder='Информация о факте' onChange={onChangeText} />
          { isEditing && <Text title='Загруженная картинка' size='s'/> }
          { isEditing && <ImageUploaded files={imgUploaded} /> }
          <Text title={isEditing ? 'Изменить картинку' : 'Добавить картинку'} size='s'/>
          <FilePicker remove={removeImage} disabled={isDisabled} getFiles={addImg} />
          <div className={cls.buttons}>
                <Button onClick={submitFact} variant={buttonType.FILLED}>
                  {isEditing ? 'Сохранить' : 'Опубликовать'}
                </Button>
                <LinkButton to={'/#facts'} variant={buttonType.GRADIENT}>Отмена</LinkButton>
                {isNewFact &&
                  <LinkButton 
                    to={'/#facts'}
                    variant={buttonType.FILLED}>
                      Перейти к карточкам фактов
                  </LinkButton>
                }
          </div>
        </div>
      </Container>
    </div>
  )
}
