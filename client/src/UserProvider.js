import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'
import axios from 'axios'
import { authenticatedUser, userTokenFunction } from './helpers/auth'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(authenticatedUser())


  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authenticatedUser()) {
        return
      }
      try {
        const { data } = await axios.get('/api/auth/profile/', userTokenFunction())
        setUser(data)
      } catch (error) {
        console.error('Error fetching user profile', error)
      }
    }
    fetchUserProfile()
  }, [isAuthenticated])

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
