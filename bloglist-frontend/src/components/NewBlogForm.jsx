import { useState } from 'react'

const NewBlogForm = ({
        handleSubmitNewBlog
    }) => {

    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setNewBlog( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const addBlog = (event) => {
        event.preventDefault()
        handleSubmitNewBlog(newBlog)
        setNewBlog({title: '', author: '', url: ''})
      }

  return (
    <section>
        <h2>Create new</h2>
        <form
            onSubmit={addBlog}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 15,
                marginBottom: 30
            }}
        >
            <div>
                <label style={{marginRight: 10}} htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={newBlog.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label style={{marginRight: 10}} htmlFor="author">Author:</label>
                <input
                    type="text"
                    name="author"
                    id="author"
                    value={newBlog.author}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label style={{marginRight: 10}} htmlFor="url">URL:</label>
                <input
                    type="text"
                    name="url"
                    id="url"
                    value={newBlog.url}
                    onChange={handleInputChange}
                />
            </div>
            <input type="submit" value="Create" />
        </form>
    </section>
  )
}
export default NewBlogForm