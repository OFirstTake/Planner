import React from 'react';
import styles from './weekswitcher.module.css'; 

export const getMonday = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
};

const formatDate = (date) => {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${d}/${m}`;
};

function WeekSwitcher({ weekStart, setWeekStart }) {

    const handlePrevWeek = () => {
        const newDate = new Date(weekStart);
        newDate.setDate(weekStart.getDate() - 7); 
        setWeekStart(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(weekStart);
        newDate.setDate(weekStart.getDate() + 7);
        setWeekStart(newDate);
    };

    const handleThisWeek = () => {
        setWeekStart(getMonday(new Date()));
    };

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const isCurrentWeek = weekStart.toDateString() === getMonday(new Date()).toDateString();

    return (
        <div className={styles.container}>
            <button className={styles.navBtn} onClick={handlePrevWeek}>&lt;</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={styles.dateDisplay}>
                    {formatDate(weekStart)} - {formatDate(weekEnd)}
                </span>
                
                {!isCurrentWeek && (
                    <button className={styles.thisWeekBtn} onClick={handleThisWeek}>
                        This week
                    </button>
                )}
            </div>
            <button className={styles.navBtn} onClick={handleNextWeek}>&gt;</button>
        </div>
    );
}

export default WeekSwitcher;