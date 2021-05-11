import React from 'react';
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "../Task";
import {ReduxStoreProviderDecorator} from "./Decorators/ReduxStoreProviderDecorator";


export default {
    title: 'TodoList/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove Button inside Task clicked')

const Template: Story<TaskPropsType> = (args: TaskPropsType) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTaskStatus: removeTaskCallback,
}
export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {
        id: '1',
        isDone: true,
        title: 'JS',
        status: 0,
        startDate: '',
        deadline: '',
        priority: 1,
        description: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
    },
    todoListId: 'todoListId1',
};
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1',
        isDone: false,
        title: 'JS',
        status: 0,
        startDate: '',
        deadline: '',
        priority: 1,
        description: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''},
    todoListId: 'todoListId1'
};

