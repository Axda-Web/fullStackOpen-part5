import Notification from "./Notification"

const LoginForm = ({
        username,
        setUsername,
        password,
        setPassword,
        handleLogin,
        errorMessage,
        successMessage
    }) => {

    const handleInputChange = e => {
        const { value, name } = e.target
        name === "username"
            ? setUsername(value)
            : setPassword(value)
    }

  return (
    <>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} classes="notification notification--error"/>
        <Notification message={successMessage} classes="notification notification--success"/>
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
    </>
  )
}
export default LoginForm