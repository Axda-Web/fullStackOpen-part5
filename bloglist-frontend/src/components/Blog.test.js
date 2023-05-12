import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const handleBlogUpdate = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'TDD with Jest and RTL',
      author: 'Axda',
      url: 'http://localhost:3003/api/blogs/21',
      likes: 35
    }

    render(<Blog blog={blog} handleBlogUpdate={handleBlogUpdate} />)
  })

  test('renders blog title and author', () => {

    const title = screen.getByText(/TDD with Jest and RTL/)
    const author = screen.getByText(/Axda/)
    const url = screen.queryByText(/http:\/\/localhost:3003\/api\/blogs\/21/)
    const likes = screen.queryByText(/35/)

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders url and number of likes if view button is clicked', async () => {

    const user = userEvent.setup()
    const viewButton = screen.getByText(/view/)
    await user.click(viewButton)

    const url = screen.queryByText(/http:\/\/localhost:3003\/api\/blogs\/21/)
    const likes = screen.queryByText(/35/)
    expect(url).toBeDefined()
    expect(likes).toBeDefined()

  })

  test('event handler function is trigerred everytime like button is clicked', async () => {

    const user = userEvent.setup()
    const viewButton = screen.getByText(/view/)
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleBlogUpdate).toHaveBeenCalledTimes(2)
  })
})
