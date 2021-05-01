import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolist().then(res => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('<<<<<<New TodoList>>>>>>')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '2b91c4ba-1be6-4f68-84a3-7d07de15a465';
        todolistAPI.deleteTodolist(todoListId).then(res => setState(res.data))

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'f4df2e1c-7c20-45fd-a8cc-b369264de99c';
        todolistAPI.updateTodolist(todoListId, 'Best TodoList Ever').then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
