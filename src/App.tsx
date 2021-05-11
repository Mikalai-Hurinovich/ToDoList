import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeTodoListTitleTC,
    createTodoListTC,
    deleteTodoListTC,
    fetchTodolistTC,
    filterTodoListAC,
    TodolistDomainType
} from "./state/todoList-reducer";
import {addTasksTC, changeTaskTitleTC, removeTasksTC, updateTaskStatusTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    status: number,
    deadline: string,
    description: string,
    priority: number,
    startDate: string
    todoListId: string
    order: number
    addedDate: string
}

export type FilterValuesType = 'all' | 'active' | 'completed'

// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {
    // BLL: Business Logic Layer
    // const todoListId_1 = v1()
    // const todoListId_2 = v1()
    // const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
    //     {id: todoListId_1, title: 'What to Read', filter: 'all'},
    //     {id: todoListId_2, title: 'What to Buy', filter: 'all'},
    // ])
    // const [tasks, dispatchTasks] = useReducer(taskReducer, {
    //     [todoListId_1]: [
    //         {id: v1(), title: 'Кинг', isDone: true},
    //         {id: v1(), title: 'Булгаков', isDone: false},
    //         {id: v1(), title: 'Ремарк', isDone: true},
    //         {id: v1(), title: 'Достоевский', isDone: false},
    //         {id: v1(), title: 'Пушкин', isDone: true},
    //         {id: v1(), title: 'Фицжеральд', isDone: false},
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: 'Milk', isDone: false},
    //         {id: v1(), title: 'Bread', isDone: true},
    //         {id: v1(), title: 'Cheese', isDone: false},
    //         {id: v1(), title: 'Egg', isDone: false},
    //         {id: v1(), title: 'Salad', isDone: false},
    //         {id: v1(), title: 'Salmon', isDone: false},
    //     ],
    // })
    let dispatch = useDispatch()
    let todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)

    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    useEffect(() => {
        //3. Dispatch thunk
        dispatch(fetchTodolistTC())
    }, [])

    const removeTask = useCallback((taskID: string, TodoListID: string) => {
        dispatch(removeTasksTC(taskID, TodoListID))
    }, [dispatch])

    const addTask = useCallback((TodoListID: string, taskTitle: string) => {
        dispatch(addTasksTC(TodoListID, taskTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: number, TodoListID: string) => {
        // dispatch(changeTaskStatusAC(taskId, newIsDoneValue, TodoListID))
        dispatch(updateTaskStatusTC(taskId, newIsDoneValue, TodoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, TodoListID: string) => {
        dispatch(changeTaskTitleTC(taskId, TodoListID, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((newFilterValue: FilterValuesType, TodoListID: string) => {
        dispatch(filterTodoListAC(newFilterValue, TodoListID))
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, TodoListID: string) => {
        dispatch(changeTodoListTitleTC(newTitle, TodoListID))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoListTC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        debugger
        dispatch(createTodoListTC(title))
    }, [dispatch])

    //UI
    //CRUD: create, read, update, delete - список простейших действий, которые можно выполнить с данными
    const todoListComponent = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '30px', marginLeft: '20px', background: '#dff5f8'}}>
                    <TodoList
                        key={tl.id}
                        changeTaskTitle={changeTaskTitle}
                        todoListID={tl.id}
                        changeTaskStatus={changeTaskStatus}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        changeTodoListFilter={changeFilter}
                        addTasks={addTask}
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
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>API</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '18px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponent}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


