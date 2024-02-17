import axiosInstance from 'src/@core/lib/axios/axios'

export interface User {
  message: string
  success: boolean
  user: {
    email: string
    userId: number
    firstName: string
    lastName: string
    role: string
  }
}

export interface IUseUser {
  user: User | null
}

export async function getUser(): Promise<User | null> {
  try {
    const response = await axiosInstance.get('/api/user/verify')
    if (response.status === 200) {
      console.log('res', response)
      return await response.data
    } else {
      console.log('User fetch error')
      return null
    }
  } catch (error) {
    console.log('Sign in error')
    return null
  }
}
