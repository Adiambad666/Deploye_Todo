import React, { useState } from 'react';
import NewTask from './NewTask';
import './Tasks.css';
const ShowAllTasks = ({ tasks, onDelete, addTask, updateTask }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const resetEdit = () => {
        setEditingIndex(null);
        setIsEditing(false);
    };

    return (
        <div className="border allTasks d-flex Size">
            <div className="task-list">
                <div className="header-container">
                    <h2>All Tasks</h2>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : 'Add New Task'}
                    </button>
                </div>
                {showForm && (
                    <NewTask 
                        addTask={(newTask) => {
                            if (isEditing) {
                                updateTask(newTask, editingIndex);
                            } else {
                                addTask(newTask);
                            }
                            resetEdit();
                        }} 
                        onCancel={resetEdit} 
                        initialData={isEditing ? tasks[editingIndex] : null} // Pass current task data if editing
                    />
                )}
                {tasks.length > 0 ? (
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Assigned To</th>
                                <th>Status</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                                <th>Comments</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task.id}>
                                    <td>{task.assignedTo}</td>
                                    <td>{task.status}</td>
                                    <td>{task.dueDate}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.comments}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => onDelete(index)}>Delete</button>
                                        <button className="btn btn-warning" onClick={() => {
                                            setEditingIndex(index);
                                            setIsEditing(true);
                                        }}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>
        </div>
    );
};

export default ShowAllTasks;
