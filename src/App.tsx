import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

const App = () => {
    console.log(v1())
    // BLL: Business Logic Layer
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'Булгаков', isDone: false},
        {id: v1(), title: 'Ремарк', isDone: true},
        {id: v1(), title: 'Достоевский', isDone: false},
        {id: v1(), title: 'Пушкин', isDone: true},
        {id: v1(), title: 'Фицжеральд', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(taskID: string) {
        let filteredTasks = tasks.filter(el => el.id !== taskID) // создает массив без taskID, там где условие true
        setTasks(filteredTasks)
    }

    function addTasks(taskTitle: string) {
        let task = {id: v1(), title: taskTitle, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean) {
        const task = tasks.find(t => t.id === taskId)
        // Проверка на то, что в таск не попало случайно значение типа false -> undefined, null , 0, '', NaN
        if (task) {
            task.isDone = newIsDoneValue
            //разворачиваем массив, сравниваем поверхностную копию с ориг. массивом, и реакт понимает что надо изменить
            setTasks([...tasks])
        }
    }

    function changeFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    let tasksForTodoList = tasks
    if (filter === 'active') tasksForTodoList = tasks.filter(el => el.isDone === false)
    if (filter === 'completed') tasksForTodoList = tasks.filter(el => el.isDone === true)


    //UI
    //CRUD: create read update delete - список простейших действий, которые можно выполнить с данными
    return (
        <div className="App">
            <TodoList
                changeTaskStatus={changeTaskStatus}
                title={'What we read?'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeFilter}
                addTasks={addTasks}
                filter={filter}
            />
        </div>
    );
}

export default App;


