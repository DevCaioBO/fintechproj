
import { createRoot } from 'react-dom/client'
import './index.css'
import TechApp from './pages/TechApp/TechApp.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'


createRoot(document.getElementById('root')).render(

    <TechApp />

)
