import { useState } from 'react'
import { Container, Menu, Button, AuthModal } from '../'
import cls from './Navbar.module.scss'

export const Navbar = () => {  
    const [isAuthModal, setIsAuthModal] = useState(false)

    const onCloseModal = () => {
        setIsAuthModal(false)
    }

    const onShowModal = () => {
        setIsAuthModal(true)
    }
    
    return (
        <header className={cls.navbar}>
            <Container>
                <div className={cls.navbarInner}>
                    <Menu />                  
                    <div className={cls.btns}>
                        <Button>Войти</Button>
                        <Button onClick={onShowModal}>Зарегистрироваться</Button>
                    </div>
                </div>
            </Container>
            
            { isAuthModal && (
                <AuthModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            ) }
            
        </header>
    )
}

