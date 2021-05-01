import axios from "axios";
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ba71bc47-1781-4fe9-b781-f4d80c7b2c13'
    }
})

export const todolistAPI = {
    getTodolist() {
        return instance.get('todo-lists')
    },
    updateTodolist(todoListId: string, title: string) {
        return instance.put(`todo-lists/${todoListId}`, {title})
    },
    createTodolist(title: string) {
        return instance.post(`todo-lists`, {title})
    },
    deleteTodolist(todoListId: string) {
        return instance.delete(`todo-lists/${todoListId}`)
    }
}
