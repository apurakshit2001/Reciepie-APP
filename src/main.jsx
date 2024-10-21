import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './component/ContextAPI/Context.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)
