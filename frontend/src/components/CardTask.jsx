import React from "react";

const CardTask = ({ task }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src="https://via.placeholder.com/200"
            alt="Task Image"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {task.status}
          </div>
          <div className="mt-2 text-gray-500 text-xs">
            <p className="line-clamp-3">{task.description}</p>
          </div>
          <div className="mt-4">
            <span className="text-gray-500 font-semibold">Fecha de Inicio:</span>{" "}
            {task.dateStart}
          </div>
          <div className="mt-2">
            <span className="text-gray-500 font-semibold">Fecha de Fin:</span>{" "}
            {task.dateEnd}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
