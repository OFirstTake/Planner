import React from 'react';

import styles from './deletebtn.module.css';

function DeleteBtn({ onClick }) {
    return (
        <button className={styles.deleteBtn} onClick={onClick}>×</button>
    )
}

export default DeleteBtn;