import { useQuery, useMutation, useQueryClient, useInfiniteQuery, UseMutateFunction } from 'react-query'
import { QUERY_KEYS } from '../queryKeys'
import { authService } from 'src/@core/services/auth/authService'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { User } from 'src/@core/services/auth/useSignIn'
import { useUser } from '../user/userQueries'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { roleService } from 'src/@core/services/role/roleService'

//roll queries
export const useAllRole = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useQuery(QUERY_KEYS.GET_ALL_ROLL, roleService.getAllRole, {
    onSuccess: data => {
      queryClient.setQueryData(QUERY_KEYS.GET_ALL_ROLL, data)
    },
    onError: (error: Error) => {
      console.error('Error fetching roles:', error.message)
    }
  })
}
