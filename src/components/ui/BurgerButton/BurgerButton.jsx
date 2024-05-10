import { Button, buttonType } from '../../'
import { classNames } from '../../../utils/classNames'
import cls from './BurgerButton.module.scss'

export const BurgerButton = ({toggleMenu, toggleBurgerMenu}) => {
    const modsActive = {
        [cls.active]: 'active'
    }
    
    return (
        <Button 
            className={classNames(cls.burger, toggleMenu ? modsActive : {})}
            onClick={toggleBurgerMenu}
            variant={buttonType.CLEAR}
        >
            <span className={cls.burgerLine}></span>
            <span className={cls.burgerLine}></span>
            <span className={cls.burgerLine}></span>
           
        </Button>
    )
}
