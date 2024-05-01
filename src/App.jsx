import { Routes, Route } from 'react-router-dom'
import { MainPage, NotFoundPage } from './pages'
import { Navbar, Page } from './components'

function App() {
  return (
    <>
      <Navbar />
      <Page>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Page>
    </>
  )
}

export default App
