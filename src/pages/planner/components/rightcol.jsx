import React, { useState} from 'react'
import Project from '../cards/project.jsx'
import AddBtn from '../../../components/button/addbtn.jsx'
import { usePlannerStore } from '../../../store/store.js'

import styles from './rightcol.module.css'

function RightCol({ projects }) {

    const addProject = usePlannerStore(state => state.addProject);

    const handleAddProject = () => {
        const newProject = {
            id: Date.now(),
            title: "",
            tasks: []
        };
        addProject(newProject);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Projects
            </div>

            {projects.map(project => (
                <Project 
                    key={project.id} 
                    projectId={project.id} 
                    title={project.title} 
                    tasks={project.tasks} 
                />
            ))}
            
            <AddBtn label="Create Project" onClick={handleAddProject} />
        </div>
    )
}

export default RightCol