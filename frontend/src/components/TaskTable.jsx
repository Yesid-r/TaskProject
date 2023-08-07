import React, { useContext, useEffect, useState } from "react";
import CardTask from "./CardTask";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import { BASE_URL } from "../utils/constants";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useContext(AuthContext);
  const token = Cookies.get("accessToken");
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

  return (
    <div className="overflow-x-auto">
      {tasks.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <React.Fragment key={task._id}>
                <tr
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleTaskClick(task)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.dateStart}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.dateEnd}
                  </td>
                </tr>
                {selectedTask === task && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4">
                      <CardTask task={task} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No hay tareas</h1>
      )}
    </div>
  );
};

export default TaskTable;
