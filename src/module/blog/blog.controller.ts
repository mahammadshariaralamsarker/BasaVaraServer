import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { blogService } from './blog.service'

const createBlog = catchAsync(
  async (req, res) => {
    if (!req.user) {
      throw new Error('User is not authenticated');
    }
    const payload = {
      ...req.body,
      author: req.user.id
    };
// console.log(payload)
    const result = await blogService.createBlog(payload)

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Blog created successfully',
      data: result,
    })
  })

const getBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getBlogs(req.query)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog getting successfully',
    data: result,
  })
})

const getSingleBlog = catchAsync(async (req, res) => { 
  const blogId = req.params.id
  const result = await blogService.getSingleBlog(blogId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog getting successfully',
    data: result,
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id
  const body = req.body

console.log("update blog ......",body, blogId)
  const result = await blogService.updateBlog(blogId, body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: result,
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id
  const userId = req.user?.id; 

  await blogService.deleteBlog(blogId, userId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: {},
  })
})




export const blogController = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
