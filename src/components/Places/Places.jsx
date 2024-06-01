import { Section, Text, LinkButton, buttonType, PlaceCard } from '../'
import cls from './Places.module.scss'
import { useStore } from '../../store/StoreProvider'
import { useEffect, useState } from 'react'

export const Places = () => {
  const { authStore, placeStore } = useStore()
  const { isLoading } = placeStore
  const [ places, setPlaces ] = useState([])

  useEffect(() => {
    placeStore.getPlaces().then(data => setPlaces(data))
  }, [])

  const updatePlaceList = (placeId) => {
    const filteredPlaces = places.filter(place => place.id !== placeId)
    setPlaces(filteredPlaces)
  }
  
  return (
    <Section className={cls.places} id={'places'}>
        <div className={cls.header}>
          <Text bold color='black' className={cls.title} title='Интересные места' size='s' align='left' />
          {
            authStore.user.role === 'ADMIN' && 
            <LinkButton 
              to={'/add-place'}
              variant={ buttonType.FILLED }
            >
              Добавить +
            </LinkButton>
          }
        </div>
        <div className={cls.placesList}>
          {places &&
            places.map((place) => (
              isLoading ? <div>Загрузка...</div>
              :
                <PlaceCard
                  key={place.id}
                  placeId={place.id} 
                  alt={place.title}
                  imgUrl={`http://localhost:5000/${place.thumbnail}`}
                  update={updatePlaceList}
                >
                  {place.title}
                </PlaceCard>
            ))
          }
        </div> 
    </Section>
  )
}
