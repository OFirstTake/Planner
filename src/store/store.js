// src/store/store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from './db.js';

export const usePlannerStore = create(
    persist(
        (set) => ({
            projects: db,

            addProject: (newProject) => set((state) => ({
                projects: [...state.projects, newProject]
            })),

            deleteProject: (projectId) => set((state) => ({
                projects: state.projects.filter(p => p.id !== projectId)
            })),

            addTask: (projectId, newTask) => set((state) => ({
                projects: state.projects.map(project => {
                    if (project.id === projectId) {
                        return { ...project, tasks: [...project.tasks, newTask] };
                    }
                    return project;
                })
            })),

            updateTask: (projectId, taskIdToUpdate, updatedFields) => set((state) => ({
                projects: state.projects.map(project => {
                    if (project.id === projectId) {
                        const newTasks = project.tasks.map(task => {
                            if (task.id === taskIdToUpdate) return { ...task, ...updatedFields };
                            return task;
                        });
                        return { ...project, tasks: newTasks };
                    }
                    return project;
                })
            })),
            
            deleteTask: (projectId, taskIdToDelete) => set((state) => ({
                projects: state.projects.map(project => {
                    if (project.id === projectId) {
                        const newTasks = project.tasks.filter(task => task.id !== taskIdToDelete);
                        return { ...project, tasks: newTasks };
                    }
                    return project;
                })
            })),
        }),
        {
            name: 'PlannerData',
        }
    )
);