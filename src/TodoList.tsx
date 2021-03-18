import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
                <IconButton onClick={onClickHandler} size={'small'}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} size={'medium'} color="inherit">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: '0'}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={'contained'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    size={'small'}
                    className={props.filter === 'all' ? 'selected' : ''}
                    onClick={all}>All
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    size={'small'}
                    className={props.filter === 'active' ? 'selected' : ''}
                    onClick={active}>Active
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    size={'small'}
                    className={props.filter === 'completed' ? 'selected' : ''}
                    onClick={completed}>Completed
                </Button>
            </div>
        </div>
    )
}


export default TodoList;
