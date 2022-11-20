import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Launch from './pages/Launch'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <RouterProvider
    router={createBrowserRouter([{ path: '/', element: <Launch /> }])}
  />,
)
