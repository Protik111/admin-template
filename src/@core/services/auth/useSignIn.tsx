import { User } from './useUser'
import axios from 'src/@core/lib/axios/axios'

export async function signIn(email: string, password: string): Promise<User | any> {
  const data = {
    email: email,
    password: password
  }

  try {
    const response = await axios.post('/api/admin/login', data)
    if (response.status === 200) {
      return await response.data
    } else {
      console.log('Sign in error')
    }
  } catch (error) {
    console.log('Sign in error')
  }
}
