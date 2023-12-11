import React from "react";
import {Routes, Route} from "react-router-dom";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/Gallery" element={<Gallery />} />
      </Routes>
  );
}

export default Router;
