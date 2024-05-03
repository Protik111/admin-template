import { BlogState } from 'src/@core/components/blogs/CreateBlogModal'
import axiosInstance from 'src/@core/lib/axios/axios'

interface Permissions {
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

interface RolePermissions {
  staff: Permissions
  role: Permissions
  user: Permissions
  blog: Permissions
}

export interface RolePayload {
  name: string
  description: string
  permissions: RolePermissions
}

export async function createBlog(payload: BlogState): Promise<any> {
  try {
    const response = await axiosInstance.post('/api/blog/article/create', payload)
    if (response.status === 200) {
      return response.data
    } else {
      console.log('Blog creates failed')
    }
  } catch (error) {
    throw error
  }
}
