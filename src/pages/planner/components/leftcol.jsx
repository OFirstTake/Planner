import React, { useState} from 'react'
import WeekSwitcher, { getMonday } from '../../../components/button/weekswitcher.jsx'

import styles from './leftcol.module.css'

function LeftCol({ projects }) {

    const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? "Sun" : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][new Date().getDay() - 1]);
    const [weekStart, setWeekStart] = useState(getMonday(new Date()));
    
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const selectedDayIndex = daysOfWeek.indexOf(selectedDay);
    const selectedDate = new Date(weekStart);
    if (selectedDayIndex !== -1) {
        selectedDate.setDate(selectedDate.getDate() + selectedDayIndex);
    }

    const allTasks = projects.flatMap(project => project.tasks || []);

    const tasksForToday = allTasks.filter(task => {
        if (!task.deadline || selectedDayIndex === -1) return false;

        const isCorrectDay = task.days.includes(selectedDay);
        
        const deadlineDate = new Date(task.deadline).setHours(0, 0, 0, 0);
        const currentSelectedDate = new Date(selectedDate).setHours(0, 0, 0, 0);
        const isNotPastDeadline = deadlineDate >= currentSelectedDate;
        const CreatedDate = new Date(task.createdDate).setHours(0, 0, 0, 0);
        const isAfterCreatedDate = CreatedDate <= currentSelectedDate;

        return isCorrectDay && isNotPastDeadline && isAfterCreatedDate;
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Weekly Planner
            </div>

            <div className={styles.WeeklyPlanner}>
                <WeekSwitcher 
                    weekStart={weekStart} 
                    setWeekStart={setWeekStart} 
                />

                <div className={styles.daysContainer}>
                    {daysOfWeek.map(day => (
                        <button 
                            key={day}
                            className={`${styles.dayBtn} ${selectedDay === day ? styles.selected : ''}`}
                            onClick={() => setSelectedDay(day)}
                        >
                        {day}
                        </button>
                    ))}
                </div>

                <div className={styles.contentContainer}>
                    {tasksForToday.length === 0 ? (
                    <p>Không có gì để làm...</p>
                ) : (
                    tasksForToday.map((task, index) => (
                        <div 
                            key={task.id || index} 
                            style={{ 
                                padding: '10px', 
                                border: '1px dashed var(--border-color)', 
                                borderRadius: '6px' 
                            }}
                        >
                            <strong>{task.name}</strong> 
                            <span style={{ marginLeft: '10px', color: task.status ? 'green' : 'red' }}>
                                [{task.status ? "Đã xong" : "Chưa xong"}]
                            </span>
                        </div>
                    ))
                )}
                </div>
            </div>
        </div>
    )
}

export default LeftCol