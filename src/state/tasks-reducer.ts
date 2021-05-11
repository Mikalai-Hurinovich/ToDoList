import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionActionType} from "./todoList-reducer";
import {TaskStateType, TaskType} from "../App";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {tasksAPI} from "../api/tasks-api";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    newIsDoneValue: number
    todoListId: string
}
export type ChangeTitleStatusActionType = {
    type: 'CHANGE-TITLE-TITLE'
    taskId: string
    title: string
    todoListId: string
}

// Все экшены
type ActionType = ChangeTaskStatusActionType
    | ChangeTitleStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsActionActionType
    | setTasksActionType
    | removeTasksActionType
    | addTasksActionType


let initialState: TaskStateType = {
    // [todoListId_1]: [
    //     {id: v1(), title: 'Кинг', isDone: true},
    //     {id: v1(), title: 'Булгаков', isDone: false},
    //     {id: v1(), title: 'Ремарк', isDone: true},
    //     {id: v1(), title: 'Достоевский', isDone: false},
    //     {id: v1(), title: 'Пушкин', isDone: true},
    //     {id: v1(), title: 'Фицжеральд', isDone: false},
    // ],
    // [todoListId_2]: [
    //     {id: v1(), title: 'Milk', isDone: false},
    //     {id: v1(), title: 'Bread', isDone: true},
    //     {id: v1(), title: 'Cheese', isDone: false},
    //     {id: v1(), title: 'Egg', isDone: false},
    //     {id: v1(), title: 'Salad', isDone: false},
    //     {id: v1(), title: 'Salmon', isDone: false},
    // ],
}


export const taskReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "SET-TODOS": {
            const stataCopy = {...state}
            action.todos.forEach(tl => stataCopy[tl.id] = [])
            return stataCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoId] = action.tasks
            return stateCopy
        }
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            stateCopy[action.todoListId] = stateCopy[action.todoListId].filter(task => task.id !== action.id)
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => task.id === action.taskId
                        ? {...task, status: action.newIsDoneValue}
                        : task)
            }
            // return state
        }
        case 'CHANGE-TITLE-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => task.id === action.taskId
                        ? {...task, title: action.title}
                        : task)
            }
        }
        case "ADD-TODOLIST":
            let todolistId = action.todo.id;
            return {...state, [todolistId]: []}
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state;
    }
}

// Создаем Action Creator, чтобы была возможность проводить манипуляции с данными action, например вызывать
// console.log, сделать проверку и тд
export const removeTaskAC = (id: string, todoListId: string): RemoveTaskActionType => {
    // можем не писать newFilterValue: newFilterValue, тк названия одинаковы
    return {type: 'REMOVE-TASK', id, todoListId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, newIsDoneValue: number, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', newIsDoneValue, todoListId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTitleStatusActionType => {
    return {type: 'CHANGE-TITLE-TITLE', title, todoListId, taskId}
}
// export const AddTodolistAC = (title: string): AddTodolistActionType => {
//     return {type: 'ADD-TODOLIST', title, todoListId: v1()}
// }
export const setTasksAC = (tasks: Array<TaskType>, todoId: string) => ({
    type: 'SET-TASKS', tasks, todoId
} as const)

type setTasksActionType = ReturnType<typeof setTasksAC>
type removeTasksActionType = ReturnType<typeof removeTaskAC>
type addTasksActionType = ReturnType<typeof addTaskAC>

export const fetchTasksThunkCreator = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}

export const removeTasksTC = (taskID: string, TodoListID: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(TodoListID, taskID)
        .then(() => {
            dispatch(removeTaskAC(taskID, TodoListID))
        })
}

export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const changeTaskTitleTC = (taskId: string, todoListId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allAppTasks = getState().tasks
    const tasksForCurrentTodo = allAppTasks[todoListId]
    const currentTask = tasksForCurrentTodo.find(t => t.id === taskId)
    if (currentTask) {
        tasksAPI.updateTasks(todoListId, taskId, {
            title: title,
            status: currentTask.status,
            deadline: '',
            description: '',
            priority: 1,
            startDate: ''
        })
            .then(() => {
                dispatch(changeTaskTitleAC(taskId, title, todoListId))
            })
    }

}
export const updateTaskStatusTC = (taskId: string, status: number, todoListId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allAppTasks = getState().tasks
        const tasksForCurrentTodo = allAppTasks[todoListId]
        const currentTask = tasksForCurrentTodo.find((t) => t.id === taskId)

        if (currentTask) {
            tasksAPI.updateTasks(todoListId, taskId, {
                title: currentTask.title,
                status: status,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate
            })
                .then(() => {
                    dispatch(changeTaskStatusAC(taskId, status, todoListId))
                })
        }
    }

