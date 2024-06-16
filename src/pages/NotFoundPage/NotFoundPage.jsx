import { Container, Text, LinkButton, buttonType } from '../../components'
import cls from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
  return (
    <Container>
      <div className={cls.notFound}>
        <span>😕</span>
        <Text title='Ничего не найдено' size='l' align='center' bold />
        <Text text='К сожалению данная страница отсутствует в приложении.' size='l' align='center' />
        <LinkButton to={"/"} variant={buttonType.GRADIENT}>Перейти на главную страницу</LinkButton>
      </div>
    </Container>
  )
}
