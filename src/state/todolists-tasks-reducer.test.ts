import {taskReducer} from "./tasks-reducer";
import {addTodoListAC, todoListReducer} from "./todoList-reducer";
import {TaskStateType, TodoListType} from "../App";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");
    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});

