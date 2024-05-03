import axiosInstance from 'src/@core/lib/axios/axios'

export type BlogPayload = {
  page: number
  limit: number
  state: string
  platform: string
}

export async function getAllBlogs(payload: BlogPayload): Promise<any> {
  try {
    const response = await axiosInstance.post('/api/blog/article/getall', payload)
    if (response.status === 200) {
      return response.data
    } else {
      console.log('Blog creates failed')
    }
  } catch (error) {
    throw error
  }
}
