import { useQuery, useMutation, useQueryClient, useInfiniteQuery, UseMutateFunction } from 'react-query'
import { QUERY_KEYS } from '../queryKeys'
import { authService } from 'src/@core/services/auth/authService'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import Cookies from 'js-cookie'
import { User } from 'src/@core/services/auth/useSignIn'
import { useUser } from '../user/userQueries'

//auth queries
export const userSignIn = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation<User, unknown, { email: string; password: string }, unknown>(
    ({ email, password }) => {
      return authService.signIn(email, password)
    },
    {
      onSuccess: data => {
        // queryClient.setQueryData([QUERY_KEY.user], data)
        if (process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME && data && data?.token) {
          Cookies.set(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, data?.token?.accessToken, { expires: 7 })
        }
        // router.push('/')
        window.location.href = '/'
      },
      onError: error => {
        enqueueSnackbar('Ops.. Error on sign in. Try again!', {
          variant: 'error'
        })
      }
    }
  )
}
