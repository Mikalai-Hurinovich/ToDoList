import React from 'react';
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import EditableSpan, {EditableSpanPropsType} from "../EditableSpan";


export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            description: 'Value EditableSpan was changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start Value EditableSpan'
        },
        backgroundColor: {control: 'color'},
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {
    changeTitle: action('Value EditableSpan was changed'),
    title: 'EditableSpan'
};

