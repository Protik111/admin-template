import { createBlog } from './createBlog'
import { getAllBlogs } from './getAllBlogs'
import { getAllTags } from './getAllTags'
import { updateBlog } from './updateBlog'

export const blogService = {
  getAllTags,
  createBlog,
  getAllBlogs,
  updateBlog
}
