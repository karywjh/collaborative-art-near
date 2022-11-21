import { createBrowserRouter } from 'react-router-dom'
import Launch from './pages/Launch'
import Make from './pages/Make/Make'

const router = createBrowserRouter([
  { path: '/', element: <Launch /> },
  { path: '/make', element: <Make /> },
])

export default router
