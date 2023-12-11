import React from "react";
import {Routes, Route} from "react-router-dom";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";
import Home from "./pages/Home";

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
  );
}

export default Router;
