import { useState, useEffect } from 'react'
import { Section, Text, buttonType, LinkButton, FactCard } from '../'
import { useStore } from '../../store/StoreProvider'
import { SERVER_URL } from '../../api'
import cls from './Facts.module.scss'

export const Facts = () => {
  const { authStore, factStore } = useStore()
  const { isLoading } = factStore
  const [ facts, setFacts ] = useState([])

  useEffect(() => {
    factStore.getFacts().then(data => setFacts(data))
  }, [])

  const updateFactList = (factId) => {
    const filteredFacts = facts.filter(fact => fact.id !== factId)
    setFacts(filteredFacts)
  }
  
  return (
    <Section className={cls.facts} id={'facts'}>
      <div className={cls.header}>
          <Text bold color='black' className={cls.title} title='Интересные факты' size='s' align='left' />
          {
            authStore.user.role === 'ADMIN' && 
            <LinkButton 
              to={'/add-fact'}
              variant={ buttonType.FILLED }
            >
              Добавить +
            </LinkButton>
          }
        </div>
        <div className={cls.factsList}>
          {facts &&
            facts.map((fact) => (
              isLoading ? <div>Загрузка...</div>
              :
                <FactCard
                  key={fact.id}
                  factId={fact.id} 
                  alt={fact.title}
                  imgUrl={`${SERVER_URL}/${fact.img}`}
                  update={updateFactList}
                >
                  <Text title={ fact.title } />
                  <Text text={ fact.text } />
                </FactCard>
            ))
          }
        </div> 
    </Section>
  )
}
