// import {FilterValuesType, TodoListType} from "../AppClassic";
import {v1} from "uuid";
import {todolistAPI, TodolistApiType} from "../api/todolist-api";
import {FilterValuesType} from "../App";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todo: TodolistApiType
    // todoListId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    id: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    newFilterValue: FilterValuesType
    id: string
}

// Все экшены
type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType | SetTodoListsActionActionType

export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
}

export const todoListId_1 = v1()
export const todoListId_2 = v1()
let initialState: Array<TodolistDomainType> = [
    // {id: todoListId_1, title: 'What to Read', filter: 'all'},
    // {id: todoListId_2, title: 'What to Buy', filter: 'all'},
]
export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS": {
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodolistDomainType = {...action.todo, filter: "all"}
            return [newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.newTitle
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.newFilterValue
            }
            return [...state]
        }
        default:
            return state;
    }
}

// Создаем Action Creator, чтобы была возможность проводить манипуляции с данными action, например вызывать
// console.log, сделать проверку и тд
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const addTodoListAC = (todo: TodolistApiType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todo}
}
export const filterTodoListAC = (newFilterValue: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', newFilterValue, id}
}
export const changeTodolistTitleAC = (newTitle: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', newTitle, id}
}

export const setTodoListsAC = (todos: Array<TodolistApiType>) => ({
    type: 'SET-TODOS', todos
} as const)
export const deleteTodoListsAC = (todos: Array<TodolistApiType>) => ({
    type: 'SET-TODOS', todos
} as const)
// делаем автоТайп
export type SetTodoListsActionActionType = ReturnType<typeof setTodoListsAC>

// thunk

export const fetchTodolistTC = () => (dispatch: Dispatch): void => {
    // 1. server request
    todolistAPI.getTodolist()
        .then(res => {
            const todos = res.data
            // 2. dispatch action or thunk
            dispatch(setTodoListsAC(todos))
        })
    // 3. will go to App(UI layer) and dispatch thunk
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch): void => {
    todolistAPI.deleteTodolist(todoListId)
        .then(() => {
            dispatch(removeTodolistAC(todoListId))
        })
}
export const createTodoListTC = (title: string) => (dispatch: Dispatch): void => {
    todolistAPI.createTodolist(title)
        .then(res => {
            let todo = res.data.data.item
            dispatch(addTodoListAC(todo))
        })
}

export const changeTodoListTitleTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todoListId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(title, todoListId))
        })
}
