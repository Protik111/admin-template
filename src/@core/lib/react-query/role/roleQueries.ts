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
import { useCallback } from 'react'

//roll queries
export const useAllRole = () => {
  const queryClient = useQueryClient()

  return useQuery(QUERY_KEYS.GET_ALL_ROLL, roleService.getAllRole, {
    refetchOnMount: true,
    onSuccess: data => {
      queryClient.setQueryData(QUERY_KEYS.GET_ALL_ROLL, data)
    },
    onError: (error: Error) => {
      console.error('Error fetching roles:', error.message)
    }
  })
}

//staff queries
export const useAllStaff = () => {
  const queryClient = useQueryClient()

  return useQuery(QUERY_KEYS.GET_ALL_STAFF, roleService.getAllStaffs, {
    refetchOnWindowFocus: 'always',
    // onSuccess: data => {
    //   queryClient.setQueryData(QUERY_KEYS.GET_ALL_STAFF, data)
    // },
    onError: (error: Error) => {
      console.error('Error fetching staffs:', error.message)
    }
  })
}

//staff queries
export const useStaffCreate = () => {
  const queryClient = useQueryClient()

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
          queryClient.invalidateQueries(QUERY_KEYS.GET_ALL_STAFF)
          // getAllStaffQuery.refetch()
        }
      },
      onError: error => {
        if (error) {
          const axiosError = error as AxiosError<{ errors?: { message: string } }>
          if (error) {
            enqueueSnackbar(axiosError?.response?.data?.errors?.message ?? 'Password must be at least six characters', {
              variant: 'error'
            })
          }
        }
      }
    }
  )
}

//delete staff
export const useStaffDeletion = () => {
  const queryClient = useQueryClient()

  return useMutation<any, unknown, string, unknown>(id => roleService.deleteStaff(id), {
    onSuccess: data => {
      if (data) {
        enqueueSnackbar('Staff deleted successfully', {
          variant: 'success'
        })
        queryClient.invalidateQueries(QUERY_KEYS.GET_ALL_STAFF)
        // getAllStaffQuery.refetch()
      }
    },
    onError: error => {
      if (error) {
        const axiosError = error as AxiosError<{ errors?: { message: string } }>
        if (error) {
          enqueueSnackbar(axiosError?.response?.data?.errors?.message ?? 'Staff deletion failed', {
            variant: 'error'
          })
        }
      }
    }
  })
}
