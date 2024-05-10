import { BlogState } from 'src/@core/components/blogs/CreateBlogModal'
import axiosInstance from 'src/@core/lib/axios/axios'

export async function updateBlog(id: string, roleData: BlogState): Promise<any | null> {
  try {
    const response = await axiosInstance.patch(`/api/blog/article/edit/${id}`, roleData)
    if (response?.data?.success) {
      return response.data
    } else {
      console.log('Blog update failed')
      return null
    }
  } catch (error) {
    console.log('Blog update failed')
    // return error
    throw error
  }
}
