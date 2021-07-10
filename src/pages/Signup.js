import React, {useContext, useState} from 'react'
import {GlobalCtx} from "../App"

const Signup = (props) => {

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

        fetch(`${url}/auth/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                setError("User already exists")
            } else {
                setForm(blank) //reset the form
                props.history.push("/login")
            }
        })
    }

    return <nav>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange} minLength="3" maxLength="20"/>
                <input type="password" name="password" value={form.password} onChange={handleChange} minLength="3" maxLength="20"/>
                <input type="submit" value="signup" />
            </form>
            <p>{error}</p>
        </div>
    </nav>
}

export default Signup