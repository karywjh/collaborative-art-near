import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { NearProvider } from './context/Near'
import router from './router'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <NearProvider>
    <RouterProvider router={router} />
  </NearProvider>,
)
