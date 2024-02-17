// src/context/auth-context.js
import React, { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface AuthState {
  token: string
}

interface AuthContextProps {
  authState: AuthState
  loading: boolean
  setAuthState: (userAuthInfo: { data: { token: string } }) => void
  isUserAuthenticated: () => boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const { Provider } = AuthContext
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: ''
  })
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const storedToken = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '')
    if (storedToken) {
      setAuthState({ token: storedToken })
    } else {
      router.push('/pages/login')
    }

    setLoading(false)
  }, [])

  const setUserAuthInfo = ({ data }: { data: { token: string } }) => {
    if (process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME) {
      const token = Cookies.set(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, data?.token) ?? ''
      setAuthState({
        token
      })
    }
  }

  const isUserAuthenticated = () => {
    return !!authState.token
  }

  return (
    <Provider
      value={{
        authState,
        loading,
        setAuthState: userAuthInfo => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
