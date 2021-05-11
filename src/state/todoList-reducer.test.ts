import {
    addTodoListAC,
    changeTodolistTitleAC,
    filterTodoListAC,
    removeTodolistAC,
    todoListReducer
} from './todoList-reducer';
import {v1} from 'uuid';
import {TodoListType} from "../App";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
});
test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    const endState = todoListReducer(startState, addTodoListAC('Hello Tests'))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('Hello Tests');
});
test('todolist filter should be changed', () => {

    const endState = todoListReducer(startState, filterTodoListAC('active', todolistId1))

    expect(endState[0].filter).toBe('active');

});
test('todolist title should be changed', () => {
    const endState = todoListReducer(startState, changeTodolistTitleAC('Hello!', todolistId2 ))
    expect(endState[1].title).toBe('Hello!');
});

