import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate, handleBlogDelete, showRemoveBtn }) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    handleBlogUpdate(updatedBlog)
  }

  return (
    <div style={blogStyle} className="blog">
      {!showDetails ?
        <div>
          {blog.title}
          {blog.author}
          <button style={{ marginLeft: 10 }} onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
        </div>
        :
        <div>
          {blog.title}
          <button style={{ marginLeft: 10 }} onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
          <br />
          {blog.url}
          <br />
          <span id="likes-count">{blog.likes}</span>
          <button id="like-button" style={{ marginLeft: 10 }} onClick={handleLikeClick}>like</button>
          <br />
          {blog.author}
          <br />
          {showRemoveBtn && <button id="remove-button" onClick={() => handleBlogDelete(blog)}>Remove</button>}
        </div>

      }
    </div>
  )
}

export default Blog