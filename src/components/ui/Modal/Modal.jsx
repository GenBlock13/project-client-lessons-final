import { useCallback, useEffect, useRef, useState } from 'react'
import { classNames } from '../../../utils/classNames'
import cls from './Modal.module.scss'
import { Portal } from '../Portal/Portal'
import { Button, buttonType } from '../../'
import { ReactComponent as CloseSvg } from '../../../assets/close.svg'

const ANIMATION_DELAY = 300

export const Modal = (props) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef()

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onContentClick = (e) => {
        e.stopPropagation()
    }

    const onKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    const mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(cls.modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.modalInner}>
                        <div className={cls.content} onClick={onContentClick}>{ children }</div>
                        <Button variant={buttonType.CLEAR} className={cls.modalClose}>
                            <CloseSvg />
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
