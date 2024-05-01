import {classNames} from '../../../utils/classNames.js'
import cls from './Button.module.scss'

export const buttonType = {
    CLEAR: 'clear',
    OUTLINE: 'outline',
    FILLED: 'filled',
    GRADIENT: 'gradient'
}

export const buttonSize = {
    M: 'size_m',
    L: 'size_l',
}

export const Button = (props) => {
    const {
        className,
        children,
        variant = buttonType.OUTLINE,
        size = buttonSize.M,
        disabled,
        fullWidth,
        ...otherProps
    } = props

    const mods = {
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
    }

    return (
        <button 
            type='button'
            className={
                classNames(cls.btn, mods, [className, cls[variant], cls[size]])
            }
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    )
}
