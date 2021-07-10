import { Link } from "react-router-dom"

const Auth = () => {
    return (
        <div id="auth-btns">
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Create Account</button></Link>
        </div>
    )
}

export default Auth
