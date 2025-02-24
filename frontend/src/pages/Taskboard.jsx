import React from 'react';
import '../styles/Taskboard.css';
import Footer from "../components/footer";

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

export default function TaskBoard() {
  return (
    <div className="taskboard-container">

      <div className="taskboard-header">
        <h2>Remaining Tasks</h2>
        <p>All tasks remaining for this week</p>
      </div>

      <div className="taskboard-content">
        {tasks.map((task, index) => (
          <div key={index} className="task-card">
            <div className="task-title">{task.title}</div>
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
              {(task.completedCheck || task.completed === task.total) ? (
                <span className="task-end-text">&#10004;</span>
              ) : (
                <span className="task-end-text">
                  {task.completed}/{task.total}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <Footer />
      </div>

    </div>
  );
}
