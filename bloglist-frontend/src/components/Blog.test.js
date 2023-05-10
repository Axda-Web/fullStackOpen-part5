import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'TDD with Jest and RTL',
    author: 'Axda',
    url: 'http://localhost:3003/api/blogs/21',
    likes: 35
  }

  /* const { container } = */ render(<Blog blog={blog} />)
  //   const div = container.querySelector('.blog')

  //   expect(div).toHaveTextContent(/TDD with Jest and RTL/)
  //   expect(div).toHaveTextContent(/Axda/)
  //   expect(div).not.toHaveTextContent(/http:\/\/localhost:3003\/api\/blogs\/21/)
  //   expect(div).not.toHaveTextContent(/35/)

  const title = screen.getByText(/TDD with Jest and RTL/)
  const author = screen.getByText(/Axda/)
  const url = screen.queryByText(/http:\/\/localhost:3003\/api\/blogs\/21/)
  const likes = screen.queryByText(/35/)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})