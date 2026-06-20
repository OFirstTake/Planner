import React from 'react'
import LeftCol from './components/leftcol'
import RightCol from './components/rightcol'
import { db } from '../../store/db.js'
import { usePlannerStore } from '../../store/store.js'

import styles from './planner.module.css'

function Planner() {

    const projects = usePlannerStore(state => state.projects);

    return (
        <div className={styles.container}>
            <div className={styles.leftcol}>
                <LeftCol projects={projects}/>
            </div>
            <div className={styles.rightcol}>
                <RightCol projects={projects}/>
            </div>
        </div>
    )
}

export default Planner