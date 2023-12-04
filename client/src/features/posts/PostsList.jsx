import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import { useEffect, useRef } from "react";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  // Note: Apply useRef to trigger useEffect once, because of react 18 new update

  const dispatch = useDispatch()
  const effectRan = useRef(false)

  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
    // Note: wrap with usseRef boolean to trigger once  
    if (effectRan.current === false){
      if(postsStatus === "idle"){
        dispatch(fetchPosts())
      }
      return () => {effectRan.current = true}
    }

  }, [postsStatus, dispatch])

  let content
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(posts => <PostsExcerpt key={posts.id} posts={posts} />)
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList