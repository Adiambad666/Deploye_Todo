import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NewTask.css';

const NewTask = ({ addTask, onCancel, initialData }) => {
    const [assignedTo, setAssignedTo] = useState(initialData ? initialData.assignedTo : '');
    const [status, setStatus] = useState(initialData ? initialData.status : '');
    const [dueDate, setDueDate] = useState(initialData ? initialData.dueDate : '');
    const [priority, setPriority] = useState(initialData ? initialData.priority : '');
    const [comments, setComments] = useState(initialData ? initialData.comments : '');

    useEffect(() => {
        if (initialData) {
            setAssignedTo(initialData.assignedTo);
            setStatus(initialData.status);
            setDueDate(initialData.dueDate);
            setPriority(initialData.priority);
            setComments(initialData.comments);
        } else {
            resetForm();
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: initialData ? initialData.id : uuidv4(),
            assignedTo,
            status,
            dueDate,
            priority,
            comments,
        };

        addTask(newTask);
        resetForm();
    };

    const resetForm = () => {
        setAssignedTo('');
        setStatus('');
        setDueDate('');
        setPriority('');
        setComments('');
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="new-task-form">
            <input
                type="text"
                placeholder="Assigned To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                <option value="" disabled>Select Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
            >
                <option value="" disabled>Select Priority</option>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
            </select>
            <textarea
                placeholder="Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />
            <button type="submit" className="btn btn-success">
                {initialData ? 'Update Task' : 'Add Task'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
            </button>
        </form>
    );
};

export default NewTask;
