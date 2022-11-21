import { createBrowserRouter } from 'react-router-dom'
import About from './pages/About/About'
import Launch from './pages/Launch/Launch'
import Make from './pages/Make/Make'
import MakeComponent from './pages/MakeComponent/MakeComponent'
import View from './pages/View/View'

const router = createBrowserRouter([
  { path: '/', element: <Launch /> },
  { path: '/make', element: <Make /> },
  { path: '/make-component', element: <MakeComponent /> },
  { path: '/about', element: <About /> },
  { path: '/view/:contractId/:tokenId', element: <View /> },
])

export default router
