import { useQuery, useMutation, useQueryClient, useInfiniteQuery, UseMutateFunction } from 'react-query'
import { QUERY_KEYS } from '../queryKeys'

import { blogService } from 'src/@core/services/blog/blogService'

//blog queries
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
