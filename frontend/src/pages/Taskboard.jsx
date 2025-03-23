//  Written by Aleem Abbas-Hussain and Yousuf Ahmed and Sri Guhan

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Taskboard.css';
import Footer from "../components/footer";
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from "../constants";
import Navbar from "../components/navbar"; 



const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        const decoded = jwtDecode(token);
        var response1 = await axios.get(`http://localhost:8000/api/playerid/${decoded.user_id}/`);
        var playerId = response1.data.player_id;
        setPlayerId(playerId);
        const response = await axios.get(`http://localhost:8000/api/player/${playerId}/tasks/`);
        setTasks(response.data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [playerId]);

  const handleToggle = async (taskId) => {
    const taskObj = tasks.find((t) => t.task_id === taskId);
    if (!taskObj) return;

    const newCompleted = !taskObj.completed;

    try {
      await axios.patch(`http://localhost:8000/api/task/${playerId}/${taskId}/update/`, {
        completed: newCompleted
      });

      setTasks(tasks.map((t) =>
        t.task_id === taskId ? { ...t, completed: newCompleted } : t
      ));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);

  const groupedIncompleteTasks = incompleteTasks.reduce((acc, task) => {
    acc[task.kind] = acc[task.kind] || [];
    acc[task.kind].push(task);
    return acc;
  }, {});

  const allTaskCategories = [...new Set(tasks.map(task => task.kind))];

  return (
    <div className="taskboard-container">
      <Navbar />
      <div className="taskboard-header">
        <h2>Remaining Tasks</h2>
        <p>All tasks remaining for this week</p>
      </div>

      <div className="taskboard-scrollable">
        {allTaskCategories.map((kind) => (
          <div key={kind} className="task-section">
            <div className="task-section-header fixed-height" onClick={() => toggleSection(kind)}>
              <h3>{kind.charAt(0).toUpperCase() + kind.slice(1)} Tasks</h3>
              <span className="toggle-icon">{expandedSections[kind] ? "▼" : "▶"}</span>
            </div>

            {expandedSections[kind] && (
              <div className="task-list">
                {groupedIncompleteTasks[kind]?.length > 0 ? (
                  groupedIncompleteTasks[kind].map((taskObj) => (
                    <div key={taskObj.task_id} className="task-card">
                      <div className="task-title">{taskObj.title}</div>
                      <p className="task-description">{taskObj.description}</p>
                      <div className="task-points">Points: {taskObj.points}</div>
                      <div className="task-action">
                        <button
                          className={`task-button ${taskObj.completed ? 'completed' : ''}`}
                          onClick={() => handleToggle(taskObj.task_id)}
                        >
                          {taskObj.completed ? "Completed" : "Mark as Complete"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-message">Nothing here!</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {completedTasks.length > 0 && (
        <>
          <hr className="task-separator" />
          <div className="completed-tasks-section">
            <div className="task-section-header fixed-height" onClick={() => toggleSection("completed")}>
              <h2>✅ Completed Tasks</h2>
              <span className="toggle-icon">{expandedSections["completed"] ? "▼" : "▶"}</span>
            </div>

            {expandedSections["completed"] && (
              <div className="task-list">
                {completedTasks.map((taskObj) => (
                  <div key={taskObj.task_id} className="task-card completed">
                    <div className="task-title">{taskObj.title}</div>
                    <p className="task-description">{taskObj.description}</p>
                    <div className="task-points">Points: {taskObj.points}</div>
                    <div className="task-action">
                      <button className="task-button completed">Completed</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default TaskBoard;



