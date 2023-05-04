import { useState } from "react"

const Blog = ({blog}) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {!showDetails ?
      <div>
        {blog.title}
        {blog.author}
        <button style={{marginLeft: 10}} onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div> 
      :
      <div>
        {blog.title}
        <button style={{marginLeft: 10}} onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
        <button style={{marginLeft: 10}}>like</button>
        <br />
        {blog.author}
      </div>
      
      }
    </div> 
  )
}

export default Blog