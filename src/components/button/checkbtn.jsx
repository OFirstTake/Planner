import React from 'react';

import styles from './checkbtn.module.css';

function CheckBtn({ checked, onChange }) {
    return (
        <label className={styles.checkboxContainer}>
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={onChange} 
            />
            <span className={styles.checkmark}></span>
        </label>
    );
}

export default CheckBtn;