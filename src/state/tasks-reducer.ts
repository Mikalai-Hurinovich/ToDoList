import {TaskStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";

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

// Все экшены
type ActionType = RemoveTaskActionType | AddTaskActionType

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
export const addTaskAC = ( title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK',title, todoListId}
}
