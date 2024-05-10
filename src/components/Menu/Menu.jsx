import { useState } from 'react'
import cls from './Menu.module.scss'
import { classNames } from '../../utils/classNames'
import { MenuLink, BurgerButton  } from '../../components'

export const Menu = () => {
    const [toggleMenu, setToggleMenu] = useState(false)  

    const modsHidden = {
        [cls.hidden]: 'hidden'
    }

    const toggleBurgerMenu = () => {
        setToggleMenu(toggleMenu => !toggleMenu)
    }

    return (
        <>
            <BurgerButton toggleBurgerMenu={toggleBurgerMenu} toggleMenu={toggleMenu} />
            <nav className={classNames(cls.nav, !toggleMenu ? modsHidden : {})}>
                <MenuLink to="#places">Достопримечательности</MenuLink>
                <MenuLink to="#facts">Факты</MenuLink>
                <MenuLink to="#comments">Отзывы</MenuLink>
                <MenuLink to="#map">На карте</MenuLink>
            </nav>            
        </>
    )
}
