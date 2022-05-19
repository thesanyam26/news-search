import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Post from "./Component/Post";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="news" element={<Post />}>
          <Route path=":id" element={<Post />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
