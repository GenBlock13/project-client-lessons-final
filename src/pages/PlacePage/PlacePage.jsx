import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../components'
import { useStore } from '../../store/StoreProvider'

export const PlacePage = () => {
  const { placeId } = useParams()
  const { placeStore } = useStore()
  const [ place, setPlace ] = useState({})
  
  useEffect(() => {
    placeStore.getPlaceById(placeId).then(data => setPlace(data))
  }, [])
  
  return (
    <Container>
      <div>{place.title}</div>
    </Container>
  )
}
