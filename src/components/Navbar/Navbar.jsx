import { useState, useEffect } from 'react'
import { Container, Menu, Button, buttonType, AuthModal, MenuLink } from '../'
import cls from './Navbar.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/StoreProvider'
import { useScrollToHash } from '../../hooks/useScrollToHash'

export const Navbar = observer(() => {  
    const {pathname} = useScrollToHash()

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
                    {
                        pathname === '/' ? <Menu /> : <MenuLink to='/'>Токио</MenuLink>
                    }                 
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
