import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c43d539a-903b-4914-a22c-0ece781ccd2a'
    }
})
// типизация по аналогии с функцией: передаем T как параметры, подставляя {}, как начальное значение
export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: [string]
    fieldsError: [string]
    data: T
}
export type TodolistApiType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistApiType[]>('todo-lists')
    },
    updateTodolist(todoListId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todoListId}`, {title})
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistApiType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todoListId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoListId}`)
    }
}
