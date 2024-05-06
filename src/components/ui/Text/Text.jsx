import { classNames } from '../../../utils/classNames'
import cls from './Text.module.scss'

const mapSizeToClass = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
}

const mapSizeToHeaderTag = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
}

export const Text = (props) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const additionalClasses = [className, cls[variant], cls[align], sizeClass]

    return (
        <div
            className={classNames(
                cls.Text,
                {[cls.bold]: bold},
                additionalClasses,
            )}
        >
            {title && (
                <HeaderTag
                    className={cls.title}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text}>
                    {text}
                </p>
            )}
        </div>
    )
}
