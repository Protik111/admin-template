import { useQuery, useMutation, useQueryClient, useInfiniteQuery, UseMutateFunction } from 'react-query'
import { QUERY_KEYS } from '../queryKeys'
import { enqueueSnackbar } from 'notistack'

import { blogService } from 'src/@core/services/blog/blogService'
import { BlogState } from 'src/@core/components/blogs/CreateBlogModal'
import { AxiosError } from 'axios'
import { BlogPayload } from 'src/@core/services/blog/getAllBlogs'

//get all tags
export const useAllTags = () => {
  return useQuery(QUERY_KEYS.GET_ALL_TAGS, blogService.getAllTags, {
    refetchOnWindowFocus: 'always',
    // onSuccess: data => {
    //   queryClient.setQueryData(QUERY_KEYS.GET_ALL_ROLL, data)
    // },
    onError: (error: Error) => {
      console.error('Error fetching tags:', error.message)
    }
  })
}

//blog create
export const useBlogCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<any, unknown, BlogState, unknown>(
    payload => {
      return blogService.createBlog(payload)
    },
    {
      onSuccess: data => {
        if (data) {
          enqueueSnackbar('Blog created successfully', {
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
            enqueueSnackbar(axiosError?.response?.data?.errors?.message ?? 'Error creating blog', {
              variant: 'error'
            })
          }
        }
      }
    }
  )
}

//get all blogs
export const useAllBlogs = () => {
  const queryClient = useQueryClient()

  return useMutation<any, unknown, BlogPayload, unknown>(
    payload => {
      return blogService.getAllBlogs(payload)
    },
    {
      onSuccess: data => {
        if (data) {
          queryClient.invalidateQueries(QUERY_KEYS.GET_ALL_BLOGS)
          // getAllStaffQuery.refetch()
        }
      },
      onError: error => {
        if (error) {
          const axiosError = error as AxiosError<{ errors?: { message: string } }>
          if (error) {
            console.log('Error fetching blog', axiosError?.response?.data?.errors?.message)
          }
        }
      }
    }
  )
}

//update staff
export const useBlogUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<any, unknown, { id: string; blogData: BlogState }, unknown>(
    ({ id, blogData }) => blogService.updateBlog(id, blogData),
    {
      onSuccess: data => {
        console.log('data', data)
        if (data?.success) {
          enqueueSnackbar('Blog updated successfully', {
            variant: 'success'
          })
          queryClient.invalidateQueries(QUERY_KEYS.GET_ALL_BLOGS)
          // getAllStaffQuery.refetch()
        }
      },
      onError: error => {
        if (error) {
          const axiosError = error as AxiosError<{ errors?: { message: string } }>
          if (error) {
            enqueueSnackbar(axiosError?.response?.data?.errors?.message ?? 'Blog update failed', {
              variant: 'error'
            })
          }
        }
      }
    }
  )
}

//delete blog with id
export const useBlogDeletion = () => {
  const queryClient = useQueryClient()

  return useMutation<any, unknown, string, unknown>(id => blogService.deleteBlog(id), {
    onSuccess: data => {
      if (data) {
        enqueueSnackbar('Blog deleted successfully', {
          variant: 'success'
        })
        queryClient.invalidateQueries(QUERY_KEYS.GET_ALL_BLOGS)
        // getAllStaffQuery.refetch()
      }
    },
    onError: error => {
      if (error) {
        const axiosError = error as AxiosError<{ errors?: { message: string } }>
        if (error) {
          enqueueSnackbar(axiosError?.response?.data?.errors?.message ?? 'Blog deletion failed', {
            variant: 'error'
          })
        }
      }
    }
  })
}
