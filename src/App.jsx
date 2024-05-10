import { Routes, Route } from 'react-router-dom'
import { MainPage, NotFoundPage } from './pages'
import { Navbar, Page } from './components'
import { useEffect } from 'react'
import { useStore } from './store/StoreProvider'
import { observer } from 'mobx-react-lite'
import { Footer } from './components'

function App() {
  const { authStore } = useStore()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      authStore.checkAuth()
    }    
  }, [authStore])

  if (authStore.isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      <Navbar />
      <Page>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Page>
      <Footer />
    </>
  )
}

export default observer(App)
