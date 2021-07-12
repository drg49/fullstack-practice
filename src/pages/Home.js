import { useState, useEffect, useContext } from "react"
import { GlobalCtx } from "../App"
import PostCard from "../components/PostCard"

const Home = () => {
    const { gState, setGState } = useContext(GlobalCtx)
    const { url, token } = gState
    const [posts, setPosts] = useState(null)

    const getPosts = async () => {
        fetch(`${url}/post`, {
            method: "get"
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            setPosts(data.map((item, index) => {
                return (
                    <PostCard 
                        key={index} 
                        title={item.title} 
                        body={item.body} 
                        upVotes={item.upVotes}
                        downVotes={item.downVotes}
                        id={item._id} 
                    />
                )
            }))
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>{posts}</div>
        
    )
}

export default Home