import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import NotFound from "../components/NotFound";
import NewTask from "../components/NewTask";

import { AuthContext } from "../context/AuthContext";
import TaskTable from "../components/TaskTable";
import Calendar from "../components/Calendar";

const Routers = () => {
  const { user } = useContext(AuthContext);

  const renderNewTaskRoute = () => {
    return user ? <Route path="/newTask" element={<NewTask />} /> : null;
  };

  const renderTaskTableRoute = () => {
    return user ? <Route path="/tasks" element={<TaskTable />} /> : null;
  };
  const renderCalendarRoute = () => {
    return user ? <Route path="/calendar" element={<Calendar />} /> : null;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        {renderNewTaskRoute()}
        {renderTaskTableRoute()}
        {renderCalendarRoute()}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
