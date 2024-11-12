import React from 'react';

const AddPluginComponentA = () =>  React.createElement('div', { id: 'add-plugin-companion-window' }, 'Plugin A');

const AddPluginComponentB = () => React.createElement('span', { id: 'add-plugin-companion-window-button' }, 'Plugin');
AddPluginComponentB.value = 'pluginComponentA';

export const addPluginA = {
    companionWindowKey: 'pluginComponentA',
    component: React.createElement(AddPluginComponentA),
};

export const addPluginB = {
    target: 'WindowSideBarButtons',
    mode: 'add',
    component: React.createElement(AddPluginComponentB),
};