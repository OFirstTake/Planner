import React, { useState } from 'react';
import DeleteBtn from '../../../components/button/deletebtn.jsx'
import CheckBtn from '../../../components/button/checkbtn.jsx'
import Badge from '../../../components/badge/badge.jsx'
import AssignBtn from '../../../components/button/assignbtn.jsx'
import { usePlannerStore } from '../../../store/store.js'

import styles from './task.module.css'

function Task({ projectId, taskId, name, status, days, deadline, createdDate, totalOccurrences, completedDates }) {

    const updateTask = usePlannerStore(state => state.updateTask);
    const deleteTask = usePlannerStore(state => state.deleteTask);

    const handleCheckChange = () => {
        const newStatus = !status;
        
        updateTask(projectId, taskId, { 
            status: newStatus
        }); 
    };

    const handleNameChange = (e) => {
        updateTask(projectId, taskId, { name: e.target.value });
    };

    return (
        <div className={styles.container}>  
            <CheckBtn checked={status} onChange={handleCheckChange} />

            <input 
                className={styles.title} 
                type="text" 
                placeholder="Task name..." 
                defaultValue={name}
                onBlur={handleNameChange} 
                style={{ textDecoration: status ? 'line-through' : 'none', color: status ? 'gray' : 'inherit' }}
            />

            <Badge count={`${status ? totalOccurrences : completedDates.length}/${totalOccurrences}`} />

            <AssignBtn 
                projectId={projectId}
                taskId={taskId}
                days={days} 
                deadline={deadline} 
                createdDate={createdDate}
            />

            <DeleteBtn onClick={() => deleteTask(projectId, taskId)} />
        </div>
    )
}

export default Task