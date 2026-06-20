import React, { useState } from 'react';
import styles from './assignbtn.module.css';

const countDayOccurrences = (startDateStr, endDateStr, targetDayStr) => {
    if (!startDateStr || !endDateStr || !targetDayStr) return 0;

    const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const targetIndex = daysMap.indexOf(targetDayStr);

    let current = new Date(startDateStr);
    current.setHours(0, 0, 0, 0);
    
    const end = new Date(endDateStr);
    end.setHours(0, 0, 0, 0);

    let count = 0;
    while (current <= end) {
        if (current.getDay() === targetIndex) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count;
};

function AssignBtn({ onSave, createdDate = new Date(), days = [], deadline = "" }) {

    const [isOpen, setIsOpen] = useState(false);

    const [selectedDeadline, setDeadline] = useState(deadline);
    const [selectedDays, setSelectedDays] = useState(days);

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    
    const handleSave = () => {
        const totalOccurrences = selectedDays.reduce((total, day) => {
            return total + countDayOccurrences(createdDate, deadline, day);
        }, 0);
        onSave({ deadline, selectedDays, totalOccurrences });
        setIsOpen(false);                  
    };


    return (
        <>
            <button className={styles.assignBtn} onClick={() => setIsOpen(true)}>
                <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="var(--text-main)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"  
                    strokeLinejoin="round"
                >
                    <line x1="6" y1="18" x2="18" y2="6"></line>
                    <polyline points="8 6 18 6 18 16"></polyline>
                </svg>
            </button>

            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <h3 className={styles.title}>Assign Task</h3>
                        
                        <div className={styles.inputGroup}>
                            <label>Deadline:</label>
                            <input 
                                type="date" 
                                className={styles.dateInput}
                                value={deadline} 
                                onChange={(e) => setDeadline(e.target.value)} 
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Days in week:</label>
                            <div className={styles.daysContainer}>
                                {daysOfWeek.map(day => (
                                    <button 
                                        key={day}
                                        className={`${styles.dayBtn} ${selectedDays.includes(day) ? styles.selected : ''}`}
                                        onClick={() => toggleDay(day)}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>Cancel</button>
                            <button className={styles.saveBtn} onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AssignBtn;