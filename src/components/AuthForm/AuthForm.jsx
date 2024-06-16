import { useState } from 'react'
import { Input, Button, buttonType, Text } from '../'
import { ReactComponent as MailSvg } from '../../assets/mail.svg'
import { ReactComponent as PassSvg } from '../../assets/pass.svg'
import { ReactComponent as UserSvg } from '../../assets/user.svg'
import cls from './AuthForm.module.scss'
import { useStore } from '../../store/StoreProvider'

export const AuthForm = ({formType}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { authStore } = useStore()
    const [errorsMessage, setErrorsMessage] = useState([])

    const onUsernameChange = (value) => {
        setUsername(value)
    }
    const onEmailChange = (value) => {
        setEmail(value)
    }
    const onPasswordChange = (value) => {
        setPassword(value)
    }

    const registerHandler = async () => {
        setErrorsMessage([])
        const res = await authStore.registration(username, email, password)
        if (res instanceof Array) {
            res.map(err => setErrorsMessage(prev => [...prev, err]))
        }
    }

    const loginHandler = async () => {
        setErrorsMessage([])
        const res = await authStore.login(email, password)
        if (res instanceof Array) {
            setErrorsMessage(prev => [...prev, res[0]])
        }
    }
    
    return (<form className={cls.form}>
                {formType === 'register' &&
                <>
                    <Text title='Форма регистрации' size='m' align='center'/>
                    <div>
                        { errorsMessage?.length > 0 
                            && 
                            errorsMessage.map(err => 
                                <Text key={err} title={err} size='s' align='left' color='error' />) 
                        }
                    </div>
                    <Input
                        onChange={onUsernameChange}
                        value={username} 
                        addonLeft={<UserSvg />}
                        type='text'
                        placeholder='Введите имя'
                    />
                    <Input
                        onChange={onEmailChange}
                        value={email} 
                        addonLeft={<MailSvg />}
                        type='email'
                        placeholder='Введите email'
                    />
                    <Input 
                        onChange={onPasswordChange}
                        value={password} 
                        addonLeft={<PassSvg />}
                        type='password'
                        placeholder='Введите пароль'
                    />
                    <Button
                        onClick={registerHandler}
                        fullWidth
                        variant={buttonType.GRADIENT}
                    >Зарегистрироваться</Button>
                </>
                }
                {formType === 'login' &&
                <>
                    <Text title='Форма авторизации' size='m' align='center'/>
                    { errorsMessage?.length > 0 && <Text key={errorsMessage} title={errorsMessage} size='s' align='left' color='error' /> }
                    <Input
                        onChange={onEmailChange}
                        value={email} 
                        addonLeft={<MailSvg />}
                        type='text'
                        placeholder='Введите email'
                    />
                    <Input 
                        onChange={onPasswordChange}
                        value={password} 
                        addonLeft={<PassSvg />}
                        type='password'
                        placeholder='Введите пароль'
                    />
                    <Button
                        onClick={loginHandler}
                        fullWidth
                        variant={buttonType.GRADIENT}
                    >Войти</Button>
                </>
                }
            </form>
        )
}
