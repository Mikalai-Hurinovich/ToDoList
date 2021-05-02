import axios from "axios";
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ba71bc47-1781-4fe9-b781-f4d80c7b2c13'
    }
})
// типизация по аналогии с функцией: передаем T как параметры, подставляя {}, как начальное значение
type CommonResponseType<T = {}> = {
    resultCode: number
    messages: [string]
    fieldsError: [string]
    data: T
}
type TodolistApiType = {
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
