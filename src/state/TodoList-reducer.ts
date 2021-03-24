import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

export const todoListReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoListID = v1()
            const newTodoList: TodoListType = {id: newTodoListID, title: action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.newTitle
                return [...todoLists]
            }
            return todoLists
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.newFilterValue
                return [...todoLists]
            }
            return todoLists
        }
        default:
            return todoLists;
    }
}
// Создаем Action Creator, чтобы была возможность проводить манипуляции с данными action, например вызывать
// console.log, сделать проверку и тд
export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title}
}
export const FilterTodoListAC = (newFilterValue: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    // можем не писать newFilterValue: newFilterValue, тк названия одинаковы
    return {type: 'CHANGE-TODOLIST-FILTER', newFilterValue, id}
}
export const ChangeTodolistTitleAC = (newTitle: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', newTitle, id}
}
