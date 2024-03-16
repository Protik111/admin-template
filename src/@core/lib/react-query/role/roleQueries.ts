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
import { StaffPayload } from 'src/@core/services/role/createStaff'

//roll queries
export const useAllRole = () => {
  const queryClient = useQueryClient()

  return useQuery(QUERY_KEYS.GET_ALL_ROLL, roleService.getAllRole, {
    onSuccess: data => {
      queryClient.setQueryData(QUERY_KEYS.GET_ALL_ROLL, data)
    },
    onError: (error: Error) => {
      console.error('Error fetching roles:', error.message)
    }
  })
}

//roll queries
export const useAllStaff = () => {
  const queryClient = useQueryClient()

  return useQuery(QUERY_KEYS.GET_ALL_STAFF, roleService.getAllStaffs, {
    onSuccess: data => {
      queryClient.setQueryData(QUERY_KEYS.GET_ALL_STAFF, data)
    },
    onError: (error: Error) => {
      console.error('Error fetching staffs:', error.message)
    }
  })
}

//staff queries
export const useStaffCreate = () => {
  return useMutation<any, unknown, StaffPayload, unknown>(
    payload => {
      return roleService.createStaff(payload)
    },
    {
      onSuccess: data => {
        if (data) {
          enqueueSnackbar('Staff created successfully', {
            variant: 'success'
          })
        }
      },
      onError: error => {
        if (error) {
          const axiosError = error as AxiosError<{ errors?: { message: string } }>
          if (error) {
            enqueueSnackbar(axiosError?.response?.data?.errors?.message ?? 'Error on sign in. Try again!', {
              variant: 'error'
            })
          }
        }
      }
    }
  )
}
