import { Routes, Route } from 'react-router-dom'
import { MainPage, NotFoundPage, AddPlacePage, PlacePage } from './pages'
import { Navbar, Page, ProtectedRoute, Footer, Loader } from './components'
import { useEffect } from 'react'
import { useStore } from './store/StoreProvider'
import { observer } from 'mobx-react-lite'

function App() {
  const { authStore } = useStore()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      authStore.checkAuth()
    }    
  }, [authStore])

  if (authStore.isLoading) {
    return <Loader />
  }

  const isAllowedAdmin = authStore.user.role === 'ADMIN' || localStorage.getItem('roleAdmin')

  return (
    <>
      <Navbar />
      <Page>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/places/:placeId" element={<PlacePage />} />
          <Route element={<ProtectedRoute isAllowed={isAllowedAdmin} />}>
            <Route path="/add-place" element={<AddPlacePage />} />
          </Route>        
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Page>
      <Footer />
    </>
  )
}

export default observer(App)
