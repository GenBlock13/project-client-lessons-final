import cls from './ImagePanel.module.scss'
import { useState, memo } from 'react'
import { Text, FilePicker } from '../'

export const ImagePanel = memo(({setImg, gallery, setGallery}) => {
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
        <Text title='Добавить превью' size='s'/>
        <FilePicker remove={removeImage} disabled={isDisabled} getFiles={addImg}/>
        <Text title='Добавить галерею' size='s'/>
        <FilePicker remove={removeImages} multiple getFiles={addGallery} />
    </div>
  )
})
