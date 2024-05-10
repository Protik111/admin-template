import { BlogState } from 'src/@core/components/blogs/CreateBlogModal'
import axiosInstance from 'src/@core/lib/axios/axios'

export async function createBlog(payload: BlogState): Promise<any> {
  try {
    /**
     * using below dynamically
     * const formData = new FormData();
     * formData.append('name', imageData.name);
     * formData.append('image', imageData.image);
     */

    // Serialize complex types to JSON
    const serializeValue = (value: any): string | Blob => {
      if (typeof value === 'object' && value !== null) {
        return new Blob([JSON.stringify(value)], { type: 'application/json' })
      }
      return String(value)
    }

    const formData = new FormData()

    // Iterate all the properties of payload by appending
    for (const [key, value] of Object.entries(payload)) {
      if (Array.isArray(value)) {
        value.forEach((element, index) => {
          if (element != null && element !== undefined) {
            formData.append(`${key}[${index}]`, serializeValue(element))
          }
        })
      } else {
        if (value != null && value !== undefined) {
          formData.append(key, serializeValue(value))
        }
      }
    }

    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    console.log('formData', formData)

    if (payload) {
      const response = await axiosInstance.post('/api/blog/article/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status === 200) {
        return response.data
      }
    } else {
      console.log('Blog creates failed')
    }
  } catch (error) {
    throw error
  }
}
