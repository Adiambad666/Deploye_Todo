import React, { useState } from 'react';
import ShowAllTasks from './ShowAllTasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
const App = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };
    const deleteTask = (index) => {
        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    };

    const updateTask = (updatedTask, index) => {
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            newTasks[index] = updatedTask; // Update the task at the specified index
            return newTasks;
        });
    };

    return ( < center > <
        ShowAllTasks tasks = { tasks }
        addTask = { addTask }
        onDelete = { deleteTask }
        updateTask = { updateTask }
        /> <
        /center>
    );
};

export default App;