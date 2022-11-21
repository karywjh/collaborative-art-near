import { createBrowserRouter } from 'react-router-dom'
import Launch from './pages/Launch'
import Make from './pages/Make/Make'
import MakeComponent from './pages/MakeComponent/MakeComponent'

const router = createBrowserRouter([
  { path: '/', element: <Launch /> },
  { path: '/make', element: <Make /> },
  { path: '/make-component', element: <MakeComponent /> },
])

export default router
