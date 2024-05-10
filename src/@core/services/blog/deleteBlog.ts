import axiosInstance from 'src/@core/lib/axios/axios'

export async function deleteBlog(id: string): Promise<any | null> {
  try {
    const response = await axiosInstance.delete(`/api/blog/article/delete/${id}`)
    if (response.status == 200) {
      return response.data
    } else {
      console.log('Blog deletion failed')
      return null
    }
  } catch (error) {
    console.log('Blog deletion failed')
    return null
  }
}
