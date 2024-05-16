import React from "react";
import ListItem from "./components/listItem/listItem.tsx";
import Movie from "./components/movie/movie.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tv/top-rated" />} />
        <Route path="/tv/top-rated" element={<ListItem />} />
        <Route path="/movie/top-rated" element={<ListItem />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/tv/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
