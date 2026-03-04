import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/event/:id" element={<EventDetailPage />} />
    </Routes>
  );
};

export default App;
