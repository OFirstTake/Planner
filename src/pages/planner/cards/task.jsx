import React, { useState } from 'react';
import DeleteBtn from '../../../components/button/deletebtn.jsx'
import CheckBtn from '../../../components/button/checkbtn.jsx'
import Badge from '../../../components/badge/badge.jsx'
import AssignBtn from '../../../components/button/assignbtn.jsx'

import styles from './task.module.css'

function Task({ taskId, name, status, days, deadline, createdDate, totalOccurrences, onDelete }) {
    const [isCompleted, setIsCompleted] = useState(status);
    const [totalDays, setTotalDays] = useState(totalOccurrences || 0);

    const handleCheckChange = () => {
        setIsCompleted(!isCompleted);
    };

    const handleSaveAssign = (assignData) => {
        console.log(`Dữ liệu Assign của Task ${taskId}:`, assignData);
        setTotalDays(assignData.total);
    };

    return (
        <div className={styles.container}>  
            <CheckBtn checked={isCompleted} onChange={handleCheckChange} /> 

            <input className={styles.title} type="text" placeholder="Task name..." defaultValue={name}></input>

            <Badge count={`0/${totalDays}`} />

            <AssignBtn 
                days={days} 
                deadline={deadline} 
                createdDate={createdDate}
                onSave={handleSaveAssign} 
            />

            <DeleteBtn onClick={() => onDelete(taskId)} />
        </div>
    )
}

export default Task