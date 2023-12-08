import { useSelector, useDispatch } from "react-redux";
import { selectPostId } from "./postsSlice";
import { useEffect, useRef } from "react";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {

  const { isLoading, isSuccess, isError, error } = useGetPostsQuery()

  // Note: Apply useRef to trigger useEffect once, because of react 18 new update

  // const dispatch = useDispatch()
  // const effectRan = useRef(false)

  // const posts = useSelector(selectAllPosts)
  const orderedPostId = useSelector(selectPostId)
  // const postsStatus = useSelector(getPostsStatus)
  // const error = useSelector(getPostsError)

  // useEffect(() => {
  //   // Note: wrap with usseRef boolean to trigger once  
  //   if (effectRan.current === false){
  //     if(postsStatus === "idle"){
  //       dispatch(fetchPosts())
  //     }
  //     return () => {effectRan.current = true}
  //   }

  // }, [postsStatus, dispatch])

  let content;
  
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
    // content = orderedPosts.map(posts => <PostsExcerpt key={posts.id} posts={posts} />)

    content = orderedPostId.map(postId => <PostsExcerpt key={postId} postId={postId} />)
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      {content}
    </section>
  )
}

export default PostsList