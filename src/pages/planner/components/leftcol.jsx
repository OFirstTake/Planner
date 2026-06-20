import React, { useState} from 'react'
import CheckBtn from '../../../components/button/checkbtn.jsx'
import { usePlannerStore } from '../../../store/store.js'
import WeekSwitcher, { getMonday } from '../../../components/button/weekswitcher.jsx'

import styles from './leftcol.module.css'

function LeftCol({ projects }) {

    const updateTask = usePlannerStore(state => state.updateTask);

    const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? "Sun" : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][new Date().getDay() - 1]);
    const [weekStart, setWeekStart] = useState(getMonday(new Date()));
    
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const selectedDayIndex = daysOfWeek.indexOf(selectedDay);
    const selectedDate = new Date(weekStart);
    if (selectedDayIndex !== -1) {
        selectedDate.setDate(selectedDate.getDate() + selectedDayIndex);
    }

    const allTasks = projects.flatMap(project => 
        (project.tasks || []).map(task => ({ ...task, projectId: project.id }))
    );

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

    const formattedSelectedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

    const handleCheckChange = (projectId, taskId, currentDates = [], totalOccurrences, currentStatus) => {
        if (currentStatus) return;

        const isCheckedToday = currentDates.includes(formattedSelectedDate);
        let newDates;

        if (isCheckedToday) {
            newDates = currentDates.filter(date => date !== formattedSelectedDate);
        } else {
            newDates = [...currentDates, formattedSelectedDate];
        }

        const newCount = newDates.length;
        const isFinished = totalOccurrences > 0 ? (newCount >= totalOccurrences) : false;

        updateTask(projectId, taskId, { 
            completedDates: newDates,       
            completedCount: newCount,       
            status: isFinished              
        });
    };

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
                    <p>Nothing to do...</p>
                ) : (
                    tasksForToday.map((task) => {
                        const currentDates = task.completedDates || [];
                        
                        const showTick = task.status || currentDates.includes(formattedSelectedDate);

                        return (
                            <div key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <CheckBtn 
                                    checked={showTick} 
                                    onChange={() => handleCheckChange(task.projectId, task.id, currentDates, task.totalOccurrences, task.status)} 
                                />
                                <div 
                                    style={{ 
                                        fontSize: '1rem',
                                        border: '1px dashed var(--border-color)',
                                        borderRadius: '6px',
                                        outline: 'none',
                                        background: 'transparent',
                                        flexGrow: 1,         
                                        width: 'auto',       
                                        minWidth: 0,
                                        padding: '10px',
                                        marginLeft: '10px', // Giữ lại cái lề xíu cho nó không dính sát vào nút Tick
                                        
                                        // Trộn logic động vào đây: Nếu chốt sổ thì xám và gạch ngang, chưa thì xài màu var(--text-main)
                                        color: task.status ? 'gray' : 'var(--text-main)',
                                        textDecoration: task.status ? 'line-through' : 'none'
                                    }}
                                >
                                    {task.name}
                                </div>
                            </div>
                        )
                    })
                )}
                </div>
            </div>
        </div>
    )
}

export default LeftCol