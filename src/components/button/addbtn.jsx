import React from 'react';
import styles from './addbtn.module.css';

function AddBtn({ onClick, label }) {
    return (
        <button className={styles.addBtn} onClick={onClick}>
            {label}
        </button>
    );
}

export default AddBtn;