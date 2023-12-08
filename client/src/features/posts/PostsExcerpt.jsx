import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

// import React from "react";

let PostsExcerpt = ({ postId }) => {

  const posts = useSelector(state => selectPostById(state, postId))

  return (
    <article>
      <h3>{posts.title}</h3>
      <p className="excerpt">{posts.body.substring(0,100)}</p>
      <p className="postCredit">
        <Link to={`post/${posts.id}`}>View Post</Link>
        <PostAuthor userId={posts.userId}/>
        <TimeAgo timestamp={posts.date}/>
      </p>
      <ReactionButtons post={posts}/>
    </article>
  )
}

// PostsExcerpt = React.memo(PostsExcerpt)

export default PostsExcerpt