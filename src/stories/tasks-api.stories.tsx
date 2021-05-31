import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '0a040cde-a064-49c6-ba28-3ad4e48af67f'
        todolistsAPI.getTasks(todoListId).then(res => {
            setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '0a040cde-a064-49c6-ba28-3ad4e48af67f';
        todolistsAPI.createTask(todoListId, 'Best Task Ever').then(res => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '0a040cde-a064-49c6-ba28-3ad4e48af67f';
        const taskId = '246ee2b6-400b-43c4-b97f-03c17e1ac949'
        todolistsAPI.deleteTask(todoListId, taskId).then(res => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
