// // Written by Aleem Abbas-Hussain

// // Import necessary modules and styles
// import React from 'react';
// import '../styles/Taskboard.css'; // Import custom CSS for TaskBoard component
// import Footer from "../components/footer"; // Import Footer component

// // Array of task objects with title, completed, and total counts
// const tasks = [
//   { title: 'Recycle at all bin locations', completed: 23, total: 30 },
//   { title: 'Park bike at bike racks', completed: 6, total: 15 },
//   { title: 'Have shorter showers', completed: 3, total: 5 },
//   { title: 'Use a re-usable bag', completed: 21, total: 25 },
//   { title: 'Eat vegan meals on campus', completed: 1, total: 10 },
//   { title: 'Use a reusable coffee cup', completed: 19, total: 20 },
//   { title: 'Refill a bottle at a fountain', completed: 1, total: 1, completedCheck: true },
//   { title: 'Used a digital textbook', completed: 1, total: 1, completedCheck: true }
// ];

// // Define the TaskBoard component
// export default function TaskBoard() {
//   return (
//     // Main container for the TaskBoard component
//     <div className="taskboard-container">

//       {/* Header section with title and subtitle */}
//       <div className="taskboard-header">
//         <h2>Remaining Tasks</h2>
//         <p>All tasks remaining for this week</p>
//       </div>

//       {/* Content container for task cards */}
//       <div className="taskboard-content">
//         {/* Loop through the tasks array and create a task card for each task */}
//         {tasks.map((task, index) => (
//           <div 
//             key={index} 
//             className="task-card"
//           >
//             {/* Display the task title */}
//             <div className="task-title">{task.title}</div>
            
//             {/* Display the task progress bar */}
//             <div className="task-progress">
//               <div
//                 className={`task-progress-bar ${
//                   (task.completedCheck || task.completed === task.total) ? 'full' : ''
//                 }`}
//                 style={{
//                   width: (task.completedCheck || task.completed === task.total) 
//                     ? '100%' 
//                     : `${(task.completed / task.total) * 100}%`
//                 }}
//               />
//               {/* Display the progress or completion check */}
//               {(task.completedCheck || task.completed === task.total) ? (
//                 <span className="task-end-text">&#10004;</span> //Checkmark for completed tasks
//               ) : (
//                 <span className="task-end-text">
//                   {task.completed}/{task.total} 
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer section */}
//       <div className="footer">
//         <Footer />
//       </div>

//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Taskboard.css';
import Footer from "../components/footer";
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from "../constants";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitles, setTaskTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        const response1 = await axios.get(`http://localhost:8000/api/playerid/${decoded.user_id}/`);
        const playerId = response1.data.player_id;
        setPlayerId(playerId);

        const response = await axios.get(`http://localhost:8000/api/player/${playerId}/tasks/`);
        setTasks(response.data);

        // Fetch task details for each task
        const taskMapping = {};
        await Promise.all(
          response.data.map(async (taskObj) => {
            const taskResponse = await axios.get(`http://127.0.0.1:8000/api/task/${taskObj.task}/`);
            taskMapping[taskObj.task] = taskResponse.data.title;
          })
        );

        setTaskTitles(taskMapping);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggle = async (taskId) => {
    const taskObj = tasks.find((t) => t.task === taskId);
    if (!taskObj) return;

    const newCompleted = !taskObj.completed;

    try {
      await axios.patch(`http://localhost:8000/api/task/${playerId}/${taskId}/update/`, {
        completed: newCompleted
      });

      const updatedTasks = tasks.map((t) =>
        t.task === taskId ? { ...t, completed: newCompleted } : t
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="taskboard-container">
      <div className="taskboard-header">
        <h2>Remaining Tasks</h2>
        <p>All tasks remaining for this week</p>
      </div>

      <div className="taskboard-content">
        {tasks.map((taskObj, index) => (
          <div key={index} className="task-card">
            <div className="task-title">
              {taskTitles[taskObj.task] || `Task ${taskObj.task}`}
            </div>
            <div className="task-action">
              <button
                className={`task-button ${taskObj.completed ? 'completed' : ''}`}
                onClick={() => handleToggle(taskObj.task)}
              >
                {taskObj.completed ? "Completed" : "Mark as Complete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default TaskBoard;
