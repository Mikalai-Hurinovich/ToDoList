import React from 'react';
import {Meta, Story} from "@storybook/react";
import AppWithRedux from "../App";
import {ReduxStoreProviderDecorator} from "./Decorators/ReduxStoreProviderDecorator";


export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {}

