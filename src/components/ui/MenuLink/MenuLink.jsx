import { Link } from 'react-router-dom'
import { classNames } from '../../../utils/classNames'
import cls from './MenuLink.module.scss'

export const MenuLink = (props) => {
    const {
        active,
        to,
        className,
        children
    } = props
    
    const mods = {
        [cls.active]: active,
    }
    
    return (
        <Link className={classNames(cls.navLink, mods, [className])} to={to}>
            {children}
        </Link>
    )
}
