import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface AuthContextValue {
  email: string | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('userEmail')
    if (stored) setEmail(stored)
  }, [])

  const login = (mail: string) => {
    setEmail(mail)
    localStorage.setItem('userEmail', mail)
  }

  const logout = () => {
    setEmail(null)
    localStorage.removeItem('userEmail')
  }

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
