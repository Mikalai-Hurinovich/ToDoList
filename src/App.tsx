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

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    // BLL: Business Logic Layer
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to Read', filter: 'all'},
        {id: todoListId_2, title: 'What to Buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'Булгаков', isDone: false},
            {id: v1(), title: 'Ремарк', isDone: true},
            {id: v1(), title: 'Достоевский', isDone: false},
            {id: v1(), title: 'Пушкин', isDone: true},
            {id: v1(), title: 'Фицжеральд', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Cheese', isDone: false},
            {id: v1(), title: 'Egg', isDone: false},
            {id: v1(), title: 'Salad', isDone: false},
            {id: v1(), title: 'Salmon', isDone: false},

        ],
    })


    function removeTask(taskID: string, TodoListID: string) {
        tasks[TodoListID] = tasks[TodoListID].filter(el => el.id !== taskID)
        setTasks({...tasks})
    }

    function addTasks(taskTitle: string, TodoListID: string) {
        let newTask: TaskType = {id: v1(), title: taskTitle, isDone: false}
        tasks[TodoListID] = [newTask, ...tasks[TodoListID]]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, TodoListID: string) {
        const task = tasks[TodoListID].find(t => t.id === taskId)
        // Проверка на то, что в таск не попало случайно значение типа false -> undefined, null , 0, '', NaN
        if (task) {
            task.isDone = newIsDoneValue
            //разворачиваем массив, сравниваем поверхностную копию с ориг. массивом, и реакт понимает что надо изменить
            setTasks({...tasks})
        }
    }

    function changeFilter(newFilterValue: FilterValuesType, TodoListID: string) {
        const todoList = todoLists.find(el => el.id === TodoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }

    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: title, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    //UI
    //CRUD: create read update delete - список простейших действий, которые можно выполнить с данными
    const todoListComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === 'active') tasksForTodoList = tasksForTodoList.filter(el => !el.isDone)
        if (tl.filter === 'completed') tasksForTodoList = tasksForTodoList.filter(el => el.isDone)
        return (<TodoList
            todoListID={tl.id}
            changeTaskStatus={changeTaskStatus}
            title={tl.title}
            filter={tl.filter}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeTodoListFilter={changeFilter}
            addTasks={addTasks}
            removeTodoList={removeTodoList}
        />)
    })
    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;


