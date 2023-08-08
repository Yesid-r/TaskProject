import React, { useContext, useEffect, useState } from "react";
import CardTask from "./CardTask";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import { BASE_URL } from "../utils/constants";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useContext(AuthContext);
  const token = Cookies.get("accesToken");
  const id = user._id;

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/project/getProjects/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`data response:`, data);
          setTasks(data.data);
        } else {
          console.log("Error fetching tasks:", response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, [id, token]);

  const handleTaskClick = (task) => {
    setSelectedTask(task === selectedTask ? null : task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const pendingTasks = tasks.filter((task) => task.status === "Pendiente");
  const inProgressTasks = tasks.filter((task) => task.status === "En Progreso");
  const completedTasks = tasks.filter((task) => task.status === "Completada");

  return (
    <div className="container mx-auto mt-8 h-screen">
      <div className="flex flex-wrap justify-between">
        <div className="w-32 p-4">
          <h2 className="text-center text-lg font-bold mb-4">Pendiente</h2>
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="cursor-pointer hover:bg-gray-100 p-2 mb-2 rounded-md"
              onClick={() => handleTaskClick(task)}
            >
              {task.name}
            </div>
          ))}
        </div>
        <div className="w-32 p-4">
          <h2 className="text-center text-lg font-bold mb-4">En Progreso</h2>
          {inProgressTasks.map((task) => (
            <div
              key={task.id}
              className="cursor-pointer hover:bg-gray-100 p-2 mb-2 rounded-md"
              onClick={() => handleTaskClick(task)}
            >
              {task.name}
            </div>
          ))}
        </div>
        <div className="w-32 p-4">
          <h2 className="text-center text-lg font-bold mb-4">Completada</h2>
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="cursor-pointer hover:bg-gray-100 p-2 mb-2 rounded-md"
              onClick={() => handleTaskClick(task)}
            >
              {task.name}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTask && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4">
            <CardTask task={selectedTask}  token= {token}/>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
