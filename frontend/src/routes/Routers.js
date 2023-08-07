import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import NotFound from "../components/NotFound";
import NewTask from "../components/NewTask";

import { AuthContext } from "../context/AuthContext";

const Routers = () => {
  const { user } = useContext(AuthContext);

  const renderNewTaskRoute = () => {
    return user ? <Route path="/newTask" element={<NewTask />} /> : null;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        {renderNewTaskRoute()}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
