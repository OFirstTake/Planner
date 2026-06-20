import React, { useState} from 'react'
import Project from '../cards/project.jsx'
import AddBtn from '../../../components/button/addbtn.jsx'


import styles from './rightcol.module.css'

function RightCol({ projects, setProjects }) {

    const handleDeleteProject = (projectIdToDelete) => {
        const updatedProjects = projects.filter(project => project.id !== projectIdToDelete);
        setProjects(updatedProjects);
    };

    const handleAddProject = () => {
        const newProject = {
            id: Date.now(),
            title: "",
            tasks: []
        };
        setProjects([...projects, newProject]);
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
                    onDelete={handleDeleteProject} 
                />
            ))}
            
            <AddBtn label="Create Project" onClick={handleAddProject} />
        </div>
    )
}

export default RightCol