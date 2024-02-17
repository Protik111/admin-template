import { useQuery, UseQueryResult } from 'react-query'
import { QUERY_KEY } from 'src/@core/constants/queryKeys'
import { userService } from 'src/@core/services/user/userService'
import { User } from 'src/@core/services/user/useUser'

interface IUseUser {
  userQuery: UseQueryResult<User | null>
}

export const useUser = () => {
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
      refetchOnReconnect: false
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
