import { Section, Text, YandexMap } from '../'
import cls from './Map.module.scss'

export const Map = () => {
  return (
    <Section className={cls.map} id={'map'}>
        <div className={cls.header}>
            <Text bold color='black' className={cls.title} title='Карта Токио' size='s' align='left' />
        </div>
        <YandexMap />
    </Section>
  )
}
