import { useRef, useEffect, useState } from 'react'
import cls from './ImagePreview.module.scss'

const ImagePreview = ({file}) => {
    const PREVIEW_HEIGHT = 120
    const canvasRef = useRef(null)

    useEffect(() => {
        let image = new Image()
        image.src = URL.createObjectURL(file)
        image.onload = () => {
            const { naturalWidth, naturalHeight } = image
            const ratio = naturalWidth / naturalHeight
            const width = Math.ceil(ratio * PREVIEW_HEIGHT)
            canvasRef.width = width
            const ctx = canvasRef.current.getContext('2d')
            ctx.drawImage(
              image, 0, 0, naturalWidth, naturalHeight,
              0, 0, width, PREVIEW_HEIGHT
            )
            URL.revokeObjectURL(image.src)
        }
    }, [])

    return (
      <canvas
        className={cls.imagePreview}
        ref={canvasRef}
        width={PREVIEW_HEIGHT}
        height={PREVIEW_HEIGHT}
      />
    )
}

export const FilePicker = ({getFiles, multiple, disabled, remove}) => {
    const [fileList, setFileList] = useState([])

    const addFiles = (files) => {
      setFileList([...fileList, ...files])
    }

    const onFilesChange = (event) => {
        if(event.target.files.length === 0) {
          return
        }
        addFiles([...event.target.files])
        getFiles([...fileList, ...event.target.files])
    }

    const onDeleteFile = (index) => {
        remove(index)
        const items = fileList
            .filter((_, i) => i !== index)
        setFileList(items)
    }

    const renderItem = (file, index) => {
        return (
            <li className={cls.fileListItem} key={file.name + Date.now()}>
                <ImagePreview file={file} />
                <button
                className={cls.fileListDelete}
                type='button'
                onClick={() => onDeleteFile(index)}
                />  
            </li>
        )
    }

    return (
      <div className={cls.filePicker}>
        <label className={cls.addButton}>
          <input
            className={cls.addButtonInput}
            type='file'
            onClick={e => e.target.value = null}
            onChange={onFilesChange}
            accept='image/*'
            multiple={multiple}
            disabled={disabled}
          />
        </label>
        {fileList && fileList.length > 0 && (
          <ul className={cls.fileList}>
            {fileList.map((file, i) => renderItem(file, i))}
          </ul>
        )}
      </div>
    ) 
}
