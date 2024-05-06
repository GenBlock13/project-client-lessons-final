import React, {
    useEffect,
    useRef,
    useState,
} from 'react'
import { classNames } from '../../../utils/classNames'
import cls from './Input.module.scss'

export const Input = (props) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        addonLeft,
        autofocus,
        type,
        ...otherProps
    } = props
    
    const ref = useRef(null)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true)
            ref.current?.focus()
        }
    }, [autofocus])

    const onChangeHandler = (e) => {
        onChange?.(e.target.value)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const mods = {
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
    }

     return (
        <div
            className={classNames(cls.inputWrapper, mods, [
                className,
            ])}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            <input
                autoComplete="off"
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                placeholder={placeholder}
                {...otherProps}
            />
        </div>
    )
}
