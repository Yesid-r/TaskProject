import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie';
import { BASE_URL } from '../utils/constants';
import moment from 'moment-timezone';
import 'moment/locale/es';

moment.locale('es');

const timeZone = 'America/Bogota';

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const token = Cookies.get('accessToken');
  const id = user._id;

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/project/getProjects/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('data response:', data);
          setTasks(data.data);
        } else {
          console.log('Error fetching tasks:', response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, [id, token]);

  const today = moment().tz(timeZone);
  const startOfWeek = today.clone().startOf('isoWeek');
  const endOfWeek = today.clone().endOf('isoWeek');

  const weekDays = [];
  let currentDay = startOfWeek.clone();
  while (currentDay.isSameOrBefore(endOfWeek, 'day')) {
    weekDays.push(currentDay.clone());
    currentDay.add(1, 'day');
  }

  const tasksInWeek = tasks.map(task => ({
    ...task,
    dateEnd: moment.tz(task.dateEnd, timeZone).add(1, 'day').format(),
  }));

  return (
    <div className="h-screen  flex items-center justify-center">
      
      <div className="grid grid-cols-8 ">

        {weekDays.map((day, index) => (
          <div key={index} className="col-span-1 border border-gray-200">
            <div className="font-bold text-center mb-2">{day.format('dddd')}</div>
            <div className="font-bold text-center mb-2">{day.format('DD MMMM')}</div>
            <ul>
              {tasksInWeek
                .filter(task => moment.tz(task.dateEnd, timeZone).isSame(day, 'day'))
                .map((task, index) => (
                  <li key={index} className="pl-2">
                    {moment.tz(task.dateEnd, timeZone).format('HH:mm')} - {task.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
