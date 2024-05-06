import { useState, useEffect } from 'react'
import { Container, Menu, Button, buttonType, AuthModal } from '../'
import cls from './Navbar.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/StoreProvider'

export const Navbar = observer(() => {  
    const [isAuthModal, setIsAuthModal] = useState(false)
    const [formType, setFormType] = useState('')
    const {authStore} = useStore()

    useEffect(() => {
        if (authStore.isAuth) {
            onCloseModal()
        }
    }, [authStore.isAuth])

    const onCloseModal = () => {
        setIsAuthModal(false)
    }

    const onShowModalLogin = () => {
        setIsAuthModal(true)
        setFormType('login')
    }

     const onShowModalRegister = () => {
        setIsAuthModal(true)
        setFormType('register')
    }

    const onLogout = () => {
        authStore.logout()
    }
    
    return (
        <header className={cls.navbar}>
            <Container>
                <div className={cls.navbarInner}>
                    <Menu />                  
                    <div className={cls.btns}>
                        { authStore.isAuth
                        ? 
                        <>
                            <Button variant={buttonType.CLEAR}>{authStore.user.email}</Button>
                            <Button onClick={onLogout}>Выйти</Button>
                        </>
                        :
                        <>
                            <Button onClick={onShowModalLogin}>Войти</Button>
                            <Button onClick={onShowModalRegister}>Зарегистрироваться</Button>
                        </>
                        }  
                    </div>
                </div>
            </Container>
            
            { isAuthModal && (
                <AuthModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                    formType={formType}
                />
            ) }
        </header>
    )
})
