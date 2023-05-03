const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => {

    const handleInputChange = e => {
        const { value, name } = e.target
        name === "username"
            ? setUsername(value)
            : setPassword(value)
    }

  return (
    <form
        onSubmit={handleLogin}
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            rowGap: 15
        }}
    >
        <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
        />
        <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
        />
        <input type="submit" value="Login" />
    </form>
  )
}
export default LoginForm