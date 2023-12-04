import { useState } from "react";

import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <main className="App">
      {/* <Counter/> */}
      <AddPostForm />
      <PostsList />
    </main>
  )
}

export default App
