import React, { useContext, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie';

const NewTask = () => {
  const { user, dispatch } = useContext(AuthContext);

  const [alert, setAlert] = useState(null);
  const token = Cookies.get('accessToken');
  console.log("🚀 ~ file: NewTask.jsx:23 ~ handleSubmit ~ token:", token)

  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    dateStart: '',
    dateEnd: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('accessToken');
    console.log("🚀 ~ file: NewTask.jsx:23 ~ handleSubmit ~ token:", token)
    
    const response = await fetch(`${BASE_URL}/project/createProject/64cfb11f064e1cdb01c84dee`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (data.success) {
      setAlert({ type: 'success', message: data.message });
    } else {
      setAlert({ type: 'danger', message: data.message });
    }
  };

  return (
    <div className='h-screen'>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-md shadow-2xl p-8 w-full max-w-md">
          {alert && (
            <div className={`alert alert-danger alert-dismissible fade show`} role="alert">
              {alert.message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></button>
            </div>
          )}
          <h2 className="text-2xl font-semibold mb-4">Registrar Tarea</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
              <input type="text" id="name" name="name" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500" onChange={(e) => { setTaskData({ ...taskData, name: e.target.value }) }} required />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
              <textarea id="description" name="description" rows="4" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500" required onChange={(e) => { setTaskData({ ...taskData, description: e.target.value }) }}></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="dateStart" className="block text-sm font-medium text-gray-700">Fecha de inicio:</label>
                <input type="date" id="dateStart" name="dateStart" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500" required onChange={(e) => setTaskData({ ...taskData, dateStart: e.target.value })} />
              </div>
              <div>
                <label htmlFor="dateEnd" className="block text-sm font-medium text-gray-700">Fecha de fin:</label>
                <input type="date" id="dateEnd" name="dateEnd" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500" required onChange={(e) => setTaskData({ ...taskData, dateEnd: e.target.value })} />
              </div>
            </div>
            <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md" onClick={handleSubmit}>Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
