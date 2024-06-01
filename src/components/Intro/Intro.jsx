import { Section, Text } from '../'
import cls from './Intro.module.scss'
import { ReactComponent as TokyoSvg } from '../../assets/tokyo.svg'

export const Intro = () => {
  return (
    <Section className={cls.intro}>
      <div className={cls.introInner}>
        <div className={cls.title}>
          <TokyoSvg />
          <Text color='white' title="Токио" size='xl' align='center' />
        </div>
        <Text color='gray' className={cls.subtitle} title="Основан в 1457 году" size='l' align='center' />
      </div>
    </Section>
  )
}
