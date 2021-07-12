import { useState, useEffect, useContext } from "react"
import { GlobalCtx } from "../App"

const VoteComponent = (props) => {
    const { gState } = useContext(GlobalCtx)
    const { url, token } = gState
    const [voteNum, setVoteNum] = useState(props.upVotes.length || -props.downVotes.length)

    const currentUser = localStorage.getItem("user")
   
    const vote =(condition) => {
        if(condition === "upvote") {
            
            if(props.upVotes.includes(currentUser)) {
                updateVote(-1, "removeupvote")
            } else if (props.downVotes.includes(currentUser)) {
                updateVote(2, condition)
            } else {
                updateVote(1, condition) //upvote passed in as 'condition'
            }
            
        }
        if (condition === "downvote") {

            if(props.downVotes.includes(currentUser)) {
                updateVote(1, "removedownvote")
            } else if (props.upVotes.includes(currentUser)) {
                updateVote(-2, condition) //downvote passed in as 'condition'
            } else {
                updateVote(-1, condition) //downvote passed in as 'condition'   
            }

        }
    }

    const updateVote = (num, voteType) => {
        setVoteNum(voteNum + num)
        fetch(`${url}/post/${props.id}/${voteType}/${currentUser}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            }
        })
    }

    return (
        <>
            <p>{voteNum}</p>
            <button onClick={() => vote("upvote")}>Upvote</button>
            <button onClick={() => vote("downvote")}>Downvote</button>
        </>
    )
}

export default VoteComponent