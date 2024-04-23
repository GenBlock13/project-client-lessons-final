import { Routes, Route } from 'react-router-dom'
import { MainPage } from './pages'
import { NotFoundPage } from './pages'
import { Page } from './components'

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Page>
  )
}

export default App
