import VoteComponent from "./VoteComponent"

const PostCard = (props) => {

    return (
        <section id="card">
            <p>{props.title}</p>
            <p>{props.body}</p>
            <VoteComponent upVotes={props.upVotes} downVotes={props.downVotes} id={props.id}/>
        </section>
    )
}

export default PostCard