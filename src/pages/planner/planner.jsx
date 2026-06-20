import React, { useState} from 'react'
import LeftCol from './components/leftcol'
import RightCol from './components/rightcol'
import { db } from '../../components/db.js'

import styles from './planner.module.css'

function Planner() {

    const [projects, setProjects] = useState(db);

    return (
        <div className={styles.container}>
            <div className={styles.leftcol}>
                <LeftCol projects={projects}/>
            </div>
            <div className={styles.rightcol}>
                <RightCol projects={projects} setProjects={setProjects}/>
            </div>
        </div>
    )
}

export default Planner