import cls from './Textarea.module.scss'

export const Textarea = (props) => {
    const {
        children,
        onChange,
        placeholder,
        autofocus,
        value,
        ...otherProps
    } = props

    const onChangeHandler = (e) => {
        onChange?.(e.target.value)
    }
    
    return (
        <textarea
            onChange={onChangeHandler}
            className={cls.textarea}
            value={value}
            placeholder={placeholder}
            {...otherProps}
        >
          {children}  
        </textarea>
    )
}
