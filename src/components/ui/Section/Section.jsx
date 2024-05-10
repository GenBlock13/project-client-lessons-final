import cls from './Section.module.scss'
import { Container } from '../../'
import { classNames } from '../../../utils/classNames.js'

export const Section = ({children, id, className}) => {
  return (
    <section id={id} className={classNames(cls.section, {}, [className])}>
        <Container>{children}</Container>
    </section>
  )
}
