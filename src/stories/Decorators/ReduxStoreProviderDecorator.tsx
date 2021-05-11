import React from 'react';
import {AppRootStateType} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {taskReducer} from "../../state/tasks-reducer";
import {todoListReducer} from "../../state/todoList-reducer";
import {Provider} from "react-redux";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: todoListReducer
})
const initialGlobalState = {
    // todoLists: [
    //     {id: "todolistId1", title: "What to learn", filter: "all"},
    //     {id: "todolistId2", title: "What to buy", filter: "all"}
    // ],
    // tasks: {
    //     ["todolistId1"]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     ["todolistId2"]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)
