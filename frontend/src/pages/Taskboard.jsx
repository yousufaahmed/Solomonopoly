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
  
    try {
      if (taskObj.max_count <= 1) {
        // ✅ Single-step: manually send { completed: true }
        await axios.patch(`http://localhost:8000/api/task/${playerId}/${taskId}/update/`, {
          completed: true
        });
      } else {
        // ✅ Multi-step: backend handles progress
        await axios.patch(`http://localhost:8000/api/task/${playerId}/${taskId}/update/`);
      }
  
      // ✅ Always refresh task list after update
      const response = await axios.get(`http://localhost:8000/api/player/${playerId}/tasks/`);
      setTasks(response.data);
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

  const groupedIncompleteTasks = {};

  incompleteTasks.forEach(task => {
    task.tags.forEach(tag => {
      if (!groupedIncompleteTasks[tag]) {
        groupedIncompleteTasks[tag] = [];
      }
      groupedIncompleteTasks[tag].push(task);
    });
  });

  const allTaskCategories = [...new Set(incompleteTasks.flatMap(task => task.tags))];


  return (
    <div className="taskboard-container">
      <Navbar />
      <div className="taskboard-header">
        <h2>Remaining Tasks</h2>
        <p>All tasks remaining for this week</p>
      </div>

      <div className="taskboard-scrollable">
        {allTaskCategories.map((tags) => (
          <div key={tags} className="task-section">
            <div className="task-section-header fixed-height" onClick={() => toggleSection(tags)}>
              <h3>{tags.charAt(0).toUpperCase() + tags.slice(1)} Tasks</h3>
              <span className="toggle-icon">{expandedSections[tags] ? "▼" : "▶"}</span>
            </div>

            {expandedSections[tags] && (
              <div className="task-list">
                {groupedIncompleteTasks[tags]?.length > 0 ? (
                  groupedIncompleteTasks[tags].map((taskObj) => (
                    <div key={taskObj.task_id} className="task-card">
                      <div className="task-title">{taskObj.title}</div>
                      <p className="task-description">{taskObj.description}</p>
                      {taskObj.max_count > 1 ? (
                        <div className="task-progress">
                          <div className="task-progress-bar">
                            <div
                              className="task-progress-fill"
                              style={{ width: `${Math.min((taskObj.progress / taskObj.max_count) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="task-progress-text">
                            Progress: {taskObj.count} / {taskObj.max_count}
                          </p>
                        </div>
                      ) : (
                        <div className="task-points">Points: {taskObj.points}</div>
                      )}
                      <div className="task-action">
                        {taskObj.completed ? (
                          <button className="task-button completed" disabled>
                            Completed
                          </button>
                        ) : taskObj.max_count <= 1 ? (
                          <button
                            className="task-button"
                            onClick={() => handleToggle(taskObj.task_id)}
                          >
                            Mark as Complete
                          </button>
                        ) : (
                          <button
                            className="task-button"
                            onClick={() => handleToggle(taskObj.task_id)}
                          >
                            Step Complete
                          </button>
                        )}
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



