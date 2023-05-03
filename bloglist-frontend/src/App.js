import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

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
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateNewBlog = async (e) => {
    e.preventDefault()
    try {
      const returnedBlog = await blogService.create(newBlog, blogService.setToken(user.token))
      setBlogs(prevState => ([
        ...prevState,
        returnedBlog
      ]))
      setNewBlog({title: '', author: '', url: ''})
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
        />
        :
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <NewBlogForm
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            handleCreateNewBlog={handleCreateNewBlog}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
    }
    </>
  )
}

export default App