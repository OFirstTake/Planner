import React, { useState} from 'react'
import Task from './task.jsx'
import DeleteBtn from '../../../components/button/deletebtn.jsx'
import AddBtn from '../../../components/button/addbtn.jsx'

import styles from './project.module.css'

function Project({ projectId, title, tasks, onDelete }) {

    const [taskList, setTaskList] = useState(tasks);

    const handleDeleteTask = (taskIdToDelete) => {
        const updatedTasks = taskList.filter((_, index) => index !== taskIdToDelete);
        setTaskList(updatedTasks);
    };

    const handleAddTask = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${yyyy}-${mm}-${dd}`;

        const newTask = { 
            id: Date.now(),              
            name: "", 
            status: false, 
            createdDate: formattedToday,
            days: [], 
            deadline: "", 
            totalOccurrences: 0 
        };
        
        setTaskList([...taskList, newTask]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <input className={styles.title} type="text" placeholder="Project name..." defaultValue={title}></input>
                <DeleteBtn onClick={() => onDelete(projectId)} />
            </div>
            <div className={styles.tasklist}>
                {taskList.map((task, index) => (
                    <Task 
                        key={index} 
                        taskId={index} 
                        name={task.name} 
                        status={task.status} 
                        days={task.days}
                        deadline={task.deadline}
                        createdDate={task.createdDate}
                        totalOccurrences={task.totalOccurrences}                        
                        onDelete={handleDeleteTask} 
                    />
                ))}
                <AddBtn label="+ Add Task" onClick={handleAddTask} />
            </div>
        </div>
    )
}

export default Project