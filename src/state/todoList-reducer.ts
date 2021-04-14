import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
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
    ChangeTodolistFilterActionType

export const todoListId_1 = v1()
export const todoListId_2 = v1()
let initialState: Array<TodoListType> = [
    {id: todoListId_1, title: 'What to Read', filter: 'all'},
    {id: todoListId_2, title: 'What to Buy', filter: 'all'},
]
export const todoListReducer = (state: TodoListType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            // const newTodoListID = v1()
            const newTodoList: TodoListType = {id: action.todoListId, title: action.title, filter: "all"}
            return [...state, newTodoList]
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
export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}
export const FilterTodoListAC = (newFilterValue: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    // можем не писать newFilterValue: newFilterValue, тк названия одинаковы
    return {type: 'CHANGE-TODOLIST-FILTER', newFilterValue, id}
}
export const ChangeTodolistTitleAC = (newTitle: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', newTitle, id}
}
