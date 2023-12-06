import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css"; 

import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice.js";
import { fetchUsers } from "./features/users/usersSlice.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
