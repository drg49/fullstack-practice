import React, {useContext, useState} from 'react'
import {GlobalCtx} from "../App"

const Login = (props) => {

    const {gState, setGState} = useContext(GlobalCtx)
    const {url} = gState

    const blank = {
        username: "", 
        password: ""
    }

    const [form, setForm] = useState(blank)
    const [error, setError] = useState(null)

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = form

        fetch(`${url}/auth/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem("token", JSON.stringify(data))
            localStorage.setItem("user", data.username)
            setGState({...gState, token: data.token})
            setForm(blank) //reset the form
            if (data.error) {
                setError(data.error)
            } else {
                props.history.push("/")
            }
        })
    }

    return <nav>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange} minLength="3" maxLength="20"/>
                <input type="password" name="password" value={form.password} onChange={handleChange} minLength="3" maxLength="20"/>
                <input type="submit" value="Login" />
            </form>
            <p>{error}</p>
        </div>
    </nav>
}

export default Login