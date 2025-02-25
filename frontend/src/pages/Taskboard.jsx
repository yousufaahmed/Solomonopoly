// Written by Aleem Abbas-Hussain

// Import necessary modules and styles
import React from 'react';
import '../styles/Taskboard.css'; // Import custom CSS for TaskBoard component
import Footer from "../components/footer"; // Import Footer component

// Array of task objects with title, completed, and total counts
const tasks = [
  { title: 'Recycle at all bin locations', completed: 23, total: 30 },
  { title: 'Park bike at bike racks', completed: 6, total: 15 },
  { title: 'Have shorter showers', completed: 3, total: 5 },
  { title: 'Use a re-usable bag', completed: 21, total: 25 },
  { title: 'Eat vegan meals on campus', completed: 1, total: 10 },
  { title: 'Use a reusable coffee cup', completed: 19, total: 20 },
  { title: 'Refill a bottle at a fountain', completed: 1, total: 1, completedCheck: true },
  { title: 'Used a digital textbook', completed: 1, total: 1, completedCheck: true }
];

// Define the TaskBoard component
export default function TaskBoard() {
  return (
    // Main container for the TaskBoard component
    <div className="taskboard-container">

      {/* Header section with title and subtitle */}
      <div className="taskboard-header">
        <h2>Remaining Tasks</h2>
        <p>All tasks remaining for this week</p>
      </div>

      {/* Content container for task cards */}
      <div className="taskboard-content">
        {/* Loop through the tasks array and create a task card for each task */}
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className="task-card"
          >
            {/* Display the task title */}
            <div className="task-title">{task.title}</div>
            
            {/* Display the task progress bar */}
            <div className="task-progress">
              <div
                className={`task-progress-bar ${
                  (task.completedCheck || task.completed === task.total) ? 'full' : ''
                }`}
                style={{
                  width: (task.completedCheck || task.completed === task.total) 
                    ? '100%' 
                    : `${(task.completed / task.total) * 100}%`
                }}
              />
              {/* Display the progress or completion check */}
              {(task.completedCheck || task.completed === task.total) ? (
                <span className="task-end-text">&#10004;</span> //Checkmark for completed tasks
              ) : (
                <span className="task-end-text">
                  {task.completed}/{task.total} 
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer section */}
      <div className="footer">
        <Footer />
      </div>

    </div>
  );
}
