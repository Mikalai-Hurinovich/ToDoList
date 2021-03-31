import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./TodoList-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    newIsDoneValue: boolean
    todoListId: string
}
export type ChangeTitleStatusActionType = {
    type: 'CHANGE-TITLE-STATUS'
    taskId: string
    title: string
    todoListId: string
}

// Все экшены
type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTitleStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const taskReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.id)
            return copyState;
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoListId] = [newTask, ...copyState[action.todoListId]]
            return copyState;
            // variant #2
            // let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            // return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            const task = copyState[action.todoListId].find(t => t.id === action.taskId)
            // Проверка на то, что в таск не попало случайно значение типа false -> undefined, null , 0, '', NaN
            if (task) {
                task.isDone = action.newIsDoneValue
                //разворачиваем массив, сравниваем поверхностную копию с ориг. массивом, и реакт понимает что надо изменить
            }
            return copyState
        }
        case 'CHANGE-TITLE-STATUS': {
            let copyState = {...state}
            const task = copyState[action.todoListId].find(t => t.id === action.taskId)
            // Проверка на то, что в таск не попало случайно значение типа false -> undefined, null , 0, '', NaN
            if (task) {
                task.title = action.title
                //разворачиваем массив, сравниваем поверхностную копию с ориг. массивом, и реакт понимает что надо изменить
            }
            return copyState
        }
        case "ADD-TODOLIST":
            let todolistId = action.todoListId;
            return {...state, [todolistId]: []}
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            throw new Error('I dont know this type');
    }
}
// Создаем Action Creator, чтобы была возможность проводить манипуляции с данными action, например вызывать
// console.log, сделать проверку и тд
export const removeTaskAC = (id: string, todoListId: string): RemoveTaskActionType => {
    // можем не писать newFilterValue: newFilterValue, тк названия одинаковы
    return {type: 'REMOVE-TASK', id, todoListId}
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}
export const changeTaskStatusAC = (taskId: string, newIsDoneValue: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', newIsDoneValue, todoListId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTitleStatusActionType => {
    return {type: 'CHANGE-TITLE-STATUS', title, todoListId, taskId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}
