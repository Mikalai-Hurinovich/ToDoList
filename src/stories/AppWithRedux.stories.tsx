import React from 'react';
import {Meta, Story} from "@storybook/react";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";


export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    argTypes: {},
} as Meta;

const Template: Story = (args) => <Provider store={store}><AppWithRedux {...args} /></Provider>;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {}

