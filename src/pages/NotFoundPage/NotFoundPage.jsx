import { Link } from 'react-router-dom'
import { Container } from '../../components'

export const NotFoundPage = () => {
  return (
    <Container>
      <div>Страница не найдена</div>
      <Link to={"/"}>На главную</Link>
    </Container>
  )
}
