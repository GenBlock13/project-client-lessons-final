import { YMaps, Map } from '@pbe/react-yandex-maps'
import cls from './YandexMap.module.scss'

export const YandexMap = () => {
    const defaultState = {
        center: [35.6895, 139.692],
        zoom: 13,
    }

    return (
        <div className={cls.ymaps}>
            <YMaps query={{ apikey: 'ce311a8d-f0bb-47f8-9740-6a22b413cc92'}}>
                <Map style={{width: '100%', height: '70vh'}} defaultState={defaultState} />
            </YMaps>
        </div>
    )
}
