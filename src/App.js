import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import NewPost from "./pages/NewPost";
import Posts_PostId from "./pages/Posts_PostId";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/new-post" element={<NewPost />}></Route>
        <Route path="/posts/:postId" element={<Posts_PostId />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
