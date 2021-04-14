import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    todoListId: string
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, TodoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, TodoListID: string) => void
    removeTask: (taskID: string, TodoListID: string) => void
}
const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId);
    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListId)
    }, [props])
    return (
        <li className={props.task.isDone ? 'is-done' : ''}
            key={props.task.id}>
            <Checkbox
                color={'primary'}
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={onClickHandler} size={'small'}>
                <Delete/>
            </IconButton>
        </li>
    );
})

export default Task;
