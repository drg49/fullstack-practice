import { useState, useEffect, useContext } from "react"
import { GlobalCtx } from "../App"

const Home = () => {
    const { gState, setGState } = useContext(GlobalCtx)
    const { url, token } = gState
    const [posts, setPosts] = useState(null)

    const getPosts = async () => {
        fetch(`${url}/post`, {
            method: "get"
        }).then(response => response.json())
        .then(data => {
            setPosts()
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <h1>Home</h1>
    )
}

export default Home