import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { QUERY_KEY } from 'src/@core/constants/queryKeys'
import { AuthContext } from 'src/@core/context/authContext'
import { userService } from 'src/@core/services/user/userService'
import { User } from 'src/@core/services/user/useUser'

interface IUseUser {
  userQuery: UseQueryResult<User | null>
}

export const useUser = () => {
  //auth context
  // const authContext = useContext(AuthContext) || {
  //   loading: true,
  //   authState: {
  //     token: '',
  //     user: {
  //       userId: '',
  //       email: '',
  //       firstName: '',
  //       lastName: '',
  //       role: ''
  //     }
  //   },
  //   isUserAuthenticated: () => false,
  //   setAuthState: data => data
  // }

  // const setUserData = authContext.setAuthState

  // console.log('authState', authContext.authState)

  const {
    data: user,
    error,
    isLoading
  } = useQuery<User | null>(
    [QUERY_KEY.user],
    async () => {
      try {
        const user = await userService.getUser()
        return user
      } catch (error) {
        console.error('Error fetching user:', error)
        throw error
      }
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: data => {
        const userData = {
          userId: data?.user?.userId.toString() || '',
          email: data?.user?.email || '',
          firstName: data?.user?.firstName || '',
          lastName: data?.user?.lastName || '',
          role: data?.user?.role || ''
        }

        // setUserData({ data: { token: authContext.authState.token, user: userData } })
        console.log(userData, 'userData')
        // console.log('authState block', authContext.authState)
      }
    }
  )

  if (error) {
    console.log('Error', error)
  }

  return {
    isLoading,
    data: user,
    isError: !!error,
    error
  }
}
