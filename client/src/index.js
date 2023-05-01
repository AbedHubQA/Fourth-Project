import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App'
import UserProvider from './UserProvider'
import GameProvider from './GameProvider'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')

createRoot(rootElement).render(
  <BrowserRouter>
    <UserProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </UserProvider>
  </BrowserRouter>
)