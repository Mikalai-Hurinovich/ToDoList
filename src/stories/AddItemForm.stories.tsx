import React from 'react';
import {Meta, Story} from "@storybook/react";
import AddItemForm, {AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args: AddItemFormPropsType) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button inside was clicked')
};

