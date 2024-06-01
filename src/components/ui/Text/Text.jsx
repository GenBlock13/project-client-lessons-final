import { classNames } from '../../../utils/classNames'
import cls from './Text.module.scss'

const mapSizeToClass = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
    xl: cls.size_xl,
}

const mapSizeToHeaderTag = {
    s: 'h4',
    m: 'h3',
    l: 'h2',
    xl: 'h1',
}

export const Text = (props) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
        color = 'black'
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const additionalClasses = [className, cls[variant], cls[align], cls[color], sizeClass]

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
