import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodolistTitleAC,
    FilterTodoListAC,
    RemoveTodolistAC,
    todoListReducer
} from "./state/TodoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/tasks-reducer";

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

const AppWithReducers = () => {
    // BLL: Business Logic Layer
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListId_1, title: 'What to Read', filter: 'all'},
        {id: todoListId_2, title: 'What to Buy', filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer(taskReducer, {
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
        let action = removeTaskAC(taskID, TodoListID)
        dispatchTasks(action)
    }

    function addTasks(taskTitle: string, TodoListID: string) {
        let action = addTaskAC(taskTitle, TodoListID)
        dispatchTasks(action)
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, TodoListID: string) {
        let action = changeTaskStatusAC(taskId, newIsDoneValue, TodoListID)
        dispatchTasks(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, TodoListID: string) {
        let action = changeTaskTitleAC(taskId, newTitle, TodoListID)
        dispatchTasks(action)
    }

    function changeFilter(newFilterValue: FilterValuesType, TodoListID: string) {
        let action = FilterTodoListAC(newFilterValue, TodoListID)
        dispatchTodoLists(action)
    }

    function changeTodoListTitle(newTitle: string, TodoListID: string) {
        let action = ChangeTodolistTitleAC(newTitle, TodoListID)
        dispatchTodoLists(action)
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodolistAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchTasks(action)
        dispatchTodoLists(action)
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

export default AppWithReducers;


