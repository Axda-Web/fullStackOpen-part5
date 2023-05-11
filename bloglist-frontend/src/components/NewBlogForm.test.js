import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

describe('<NewBlogForm />', () => {

  test('right handler is called with the right data on new blog submission', async () => {
    const handleSubmitNewBlog = jest.fn()
    render(<NewBlogForm handleSubmitNewBlog={handleSubmitNewBlog} />)

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const sendButton = screen.getByRole('button')

    await user.type(titleInput, 'Master TypeScript')
    await user.type(authorInput, 'Axda')
    await user.type(urlInput, 'https://axda.com/blogs/65')
    await user.click(sendButton)

    expect(handleSubmitNewBlog.mock.calls).toHaveLength(1)
    expect(handleSubmitNewBlog.mock.calls[0][0].title).toBe('Master TypeScript')
  })
})
