import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'c43d539a-903b-4914-a22c-0ece781ccd2a'
    }
})
type GetTasksType = {
    error: null
    items: []
    totalCount: number
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    updateTasks(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
