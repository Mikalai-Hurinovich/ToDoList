import React from 'react';
import {Meta, Story} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "./Decorators/ReduxStoreProviderDecorator";
import App from "../app/App";


export default {
    title: 'TodoList/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <App {...args} />

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {}

