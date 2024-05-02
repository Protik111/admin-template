import axiosInstance from 'src/@core/lib/axios/axios'

export async function getAllTags(): Promise<any | null> {
  try {
    const response = await axiosInstance.get('/api/blog/tags')
    if (response.status == 200) {
      return response.data
    } else {
      console.log('Tags fetch error')
      return null
    }
  } catch (error) {
    console.log('Tag in error')
    return null
  }
}
