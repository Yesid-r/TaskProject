import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const statusTask = ['Pendiente', 'En Progreso', 'Completada'];

const CardTask = ({ task, token }) => {

    const formattedDateStart = new Date(task.dateStart).toISOString().split('T')[0];
    const formattedDateEnd = new Date(task.dateEnd).toISOString().split('T')[0];
    const [alert, setAlert] = useState([null, null]);


    const [formData, setFormData] = useState({
        name: task.name,
        status: task.status,
        description: task.description,
        dateStart: formattedDateStart,
        dateEnd: formattedDateEnd,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(`id task: ${task._id}`)
        try {
            const response = await fetch(`${BASE_URL}/project/updateProject/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setAlert([true, "Tarea actualizada"]);
                setTimeout(() => {
                    setAlert([null, null]);
                }, 2000);
            } else {
                setAlert([false, data.message]);
                setTimeout(() => {
                    setAlert([null, null]);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setAlert([false, "Error al actualizar la tarea"]);
        }

    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/project/deleteProject/${task._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setAlert([true, "Tarea eliminada"]);
                setTimeout(() => {
                    setAlert([null, null]);
                }, 2000);
            } else {
                setAlert([false, data.message]);
                setTimeout(() => {
                    setAlert([null, null]);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setAlert([false, "Error al eliminar la tarea"]);
        }
    }

    return (
        <div>
            {
                alert[0] !== null && (
                    <div
                        className={`${alert[0] ? "bg-green-200" : "bg-red-500"
                            } text-white text-center py-4 lg:px-4`}
                    >
                        {alert[1]}
                    </div>
                )
            }
            <form className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" >
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            className="h-48 w-full object-cover md:w-48"
                            src="https://cdn-icons-png.flaticon.com/512/4345/4345573.png"
                            alt="Task Image"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-gray-900 font-semibold">
                            <label htmlFor="name">Tarea: </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            <label htmlFor="status">Estado:</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                {statusTask.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-2 text-gray-500 text-xs">
                            <label htmlFor="description">Descripción:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>

                        <div className="mt-4">
                            <span className="text-gray-500 font-semibold">Fecha de Inicio:</span>{" "}
                            <input
                                type="date"
                                id="dateStart"
                                name="dateStart"
                                value={formData.dateStart}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mt-2">
                            <span className="text-gray-500 font-semibold">Fecha de Fin:</span>{" "}
                            <input
                                type="date"
                                id="dateEnd"
                                name="dateEnd"
                                value={formData.dateEnd}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFormSubmit}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="mt-4">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
                    Eliminar
                </button>
            </div>
        </div>

    );
};

export default CardTask;
