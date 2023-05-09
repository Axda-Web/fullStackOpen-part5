import { useState, useEffect, useRef } from 'react'
import './index.css'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Your are logged in!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleSubmitNewBlog = async (newBlog) => {
    newBlogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog, blogService.setToken(user.token))
      setBlogs(prevState => ([
        ...prevState,
        returnedBlog
      ]))
      setSuccessMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage('Something went wrong... Try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogUpdate = async (updatedBlog) => {

    try {
      const returnedUpddatedBlog = await blogService.update(updatedBlog.id, updatedBlog, blogService.setToken(user.token))
      if (returnedUpddatedBlog.title) {
        const updatedBlogs = blogs.map(blog => (blog.id === returnedUpddatedBlog.id ? returnedUpddatedBlog : blog))
        setBlogs(updatedBlogs)
        setSuccessMessage(`Blog ${returnedUpddatedBlog.title} updated`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } else {
        throw new Error()
      }
    } catch(exception) {
      setErrorMessage('You are not authorized to update this item')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogDelete = async (blogToRemove) => {
    if (!window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      return
    }
    try {
      await blogService.remove(blogToRemove.id, blogService.setToken(user.token))
      const updatedBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
      setBlogs(updatedBlogs)
      setSuccessMessage(`Blog ${blogToRemove.title} deleted`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage('Something went wrong... Try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return (
    <>
      { !user
        ?
        <LoginForm
          username={username}
          setUsername={setUsername}
          pasword={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        :
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} classes="notification notification--error"/>
          <Notification message={successMessage} classes="notification notification--success"/>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
            <NewBlogForm
              handleSubmitNewBlog={handleSubmitNewBlog}
            />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleBlogUpdate={handleBlogUpdate}
              handleBlogDelete={handleBlogDelete}
              showRemoveBtn={blog.user.username === user.username}
            />
          )}
        </div>
      }
    </>
  )
}

export default App