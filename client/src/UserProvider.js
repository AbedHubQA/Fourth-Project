import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'
import axios from 'axios'
import { authenticatedUser, userTokenFunction, removeToken } from './helpers/auth'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)


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
  }, [])

  const logout = () => {
    removeToken()
    setUser(null)
    console.log('User logged out')
  }

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated: authenticatedUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
