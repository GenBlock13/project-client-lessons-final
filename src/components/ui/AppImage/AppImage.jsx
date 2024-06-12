import { memo, useLayoutEffect, useState } from 'react'
import { Loader } from '../../'

export const AppImage = memo((props) => {
    const {
        className,
        src,
        alt = 'image',
        ...otherProps
    } = props

    const [isLoading, setIsLoading] = useState(true)

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? ''
        img.onload = () => {
            setIsLoading(false)
        }
        img.onerror = () => {
            setIsLoading(false)
        }
    }, [src])

    if (isLoading) {
        return <Loader />
    }

    return <img className={className} src={src} alt={alt} {...otherProps} />
})
