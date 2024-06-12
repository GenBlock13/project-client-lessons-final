import cls from './ImagePanel.module.scss'
import { useState, memo } from 'react'
import { Text, FilePicker } from '../'

export const ImagePanel = memo(({setImg, gallery, setGallery, isEditing}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    function addImg(img) {
        setImg(img[0])
        setIsDisabled(true)
    }

    function addGallery(imgs) {
        setGallery(Array.from(imgs))
    }

    function removeImages(idx) {
        const filteredGallery = gallery.filter((_, i) => i !== idx)
        setGallery(filteredGallery)
    }

    function removeImage() {
        setImg('')
        setIsDisabled(false)
    }

    return (
    <div className={cls.files}>
        <Text title={isEditing ? 'Изменить превью' : 'Добавить превью'} size='s'/>
        <FilePicker remove={removeImage} disabled={isDisabled} getFiles={addImg}/>
        <Text title={isEditing ? 'Изменить галерею' : 'Добавить галерею'} size='s'/>
        <FilePicker remove={removeImages} multiple getFiles={addGallery} />
    </div>
  )
})
