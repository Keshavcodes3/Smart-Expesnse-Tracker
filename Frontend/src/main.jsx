import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/App/index.css'
import App from '../src/App/App'
import { RouterProvider } from 'react-router-dom'
import { router } from './App/App.routes'
import { Provider } from 'react-redux'
import { store } from './App/App.store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
