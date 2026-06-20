import React from 'react';
import styles from './badge.module.css';

function Badge({ count = "3/3" }) {
    return (
        <span className={styles.badge}>{count}</span>
    );
}

export default Badge;