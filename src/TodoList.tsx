import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, TodoListID: string) => void
    addTasks: (taskTitle: string, TodoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, TodoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, TodoListID: string) => void
    changeTodoListTitle: (newTitle: string, TodoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, TodoListID: string) => void

}


function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => props.addTasks(title, props.todoListID)

    const all = () => props.changeTodoListFilter('all', props.todoListID)
    const active = () => props.changeTodoListFilter('active', props.todoListID)
    const completed = () => props.changeTodoListFilter('completed', props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const tasks = props.tasks.map(task => {
        const onClickHandler = () => props.removeTask(task.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID);
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle, props.todoListID)
        }
        return (
            <li className={task.isDone ? 'is-done' : ''}
                key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={onClickHandler}>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button className={'removeTodoListButton'} onClick={removeTodoList}> X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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
