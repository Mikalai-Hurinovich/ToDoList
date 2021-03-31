import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
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
            {id: v1(), title: 'Кинг', isDone: true},
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
    function changeTaskTitle(taskId: string, newTitle: string, TodoListID: string) {
        const task = tasks[TodoListID].find(t => t.id === taskId)
        // Проверка на то, что в таск не попало случайно значение типа false -> undefined, null , 0, '', NaN
        if (task) {
            task.title = newTitle
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
    function changeTodoListTitle(newTitle: string, TodoListID: string) {
        const todoList = todoLists.find(el => el.id === TodoListID)
        if (todoList) {
            todoList.title = newTitle
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
    //CRUD: create, read, update, delete - список простейших действий, которые можно выполнить с данными
    const todoListComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === 'active') tasksForTodoList = tasksForTodoList.filter(el => !el.isDone)
        if (tl.filter === 'completed') tasksForTodoList = tasksForTodoList.filter(el => el.isDone)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '30px', marginLeft: '20px', background: '#dff5f8'}}>
                    <TodoList
                        changeTaskTitle={changeTaskTitle}
                        todoListID={tl.id}
                        changeTaskStatus={changeTaskStatus}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeTodoListFilter={changeFilter}
                        addTasks={addTasks}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={"start"} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist Menu
                    </Typography>
                    <Button color={'inherit'}></Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '18px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;


