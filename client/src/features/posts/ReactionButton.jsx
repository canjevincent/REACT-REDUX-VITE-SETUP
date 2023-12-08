// import { useDispatch } from "react-redux";
// import { reactionAdded } from "./postsSlice";
import { useAddReactionMutation } from "./postsSlice"

const reactionEmoji = {
  thumbsUp:"👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕"
}

const ReactionButtons = ({ post }) => {

  // const dispatch = useDispatch()

  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        // onClick={() => dispatch(reactionAdded({ postId: post.id, reaction:name })) }
        onClick={() => {
          const newValue = post.reactions[name] + 1;
          addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newValue } })
        }}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return(
    <div>{reactionButtons}</div>
  )
}

export default ReactionButtons