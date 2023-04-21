import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App'
import UserProvider from './UserProvider'
import GameProvider from './GameProvider'

const rootElement = document.getElementById('root')

createRoot(rootElement).render(
  <UserProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </UserProvider>
)