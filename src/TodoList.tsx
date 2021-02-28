import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    addTasks: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    filter: FilterValuesType
}


function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const all = () => props.changeTodoListFilter('all')
    const active = () => props.changeTodoListFilter('active')
    const completed = () => props.changeTodoListFilter('completed')
    const addTask = () => {

        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTasks(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }
    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTask()
    }

    const tasks = props.tasks.map(task => {
        const onClickHandler = () => props.removeTask(task.id)
        return (
            <li className={task.isDone ? 'is-done' : ''}
                key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)}/>
                <span>{task.title} </span>
                <button onClick={onClickHandler}>X
                </button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={title}
                       onChange={changeTitle}
                       onKeyPress={keyPress}/>
                <button onClick={addTask}>+
                </button>
                {error && <div className={'error-message'}>Title is Required!</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'selected' : ''}
                        onClick={all}>All
                </button>
                <button className={props.filter === 'active' ? 'selected' : ''}
                        onClick={active}>Active
                </button>
                <button className={props.filter === 'completed' ? 'selected' : ''}
                        onClick={completed}>Completed
                </button>
            </div>
        </div>
    )
}


export default TodoList;
