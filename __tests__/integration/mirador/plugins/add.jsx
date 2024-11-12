import React from 'react';

const AddPluginComponentA = () => React.createElement('div', { id: 'add-plugin-component-a' }, 'Plugin A');

const AddPluginComponentB = () => React.createElement('div', { id: 'add-plugin-component-b' }, 'Plugin B');

const AddPluginComponentC = () => React.createElement('div', { id: 'add-plugin-component-c' }, 'Plugin C');

const CustomIcon = () =>
    React.createElement(
        'svg',
        {
            className: 'umbrella',
            xmlns: 'http://www.w3.org/2000/svg',
            width: 32,
            height: 32,
            viewBox: '0 0 32 32',
            'aria-labelledby': 'title'
        },
        React.createElement('title', { id: 'title' }, 'Umbrella Icon'),
        React.createElement('path', {
            d: 'M27 14h5c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2v0zM27 14c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2v0 14c0 1.112-0.895 2-2 2-1.112 0-2-0.896-2-2.001v-1.494c0-0.291 0.224-0.505 0.5-0.505 0.268 0 0.5 0.226 0.5 0.505v1.505c0 0.547 0.444 0.991 1 0.991 0.552 0 1-0.451 1-0.991v-14.009c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-5.415 6.671-9.825 15-9.995v-1.506c0-0.283 0.224-0.499 0.5-0.499 0.268 0 0.5 0.224 0.5 0.499v1.506c8.329 0.17 15 4.58 15 9.995h-5z'
        })
    );

const WrapPluginComponent = (plugin) => React.createElement('div', { id: 'wrapped-plugin-with-adds' }, React.createElement(plugin.TargetComponent, { menuIcon: React.createElement(CustomIcon), ...plugin.targetProps, ...plugin }));

const AddPluginComponentE = () => React.createElement('div', { id: 'add-plugin-component-e' }, React.createElement('input', { value: 'hello world' }));

export const addPluginA = {
    target: 'WorkspaceControlPanelButtons',
    mode: 'add',
    config: {
        foo: 'bar',
    },
    component: React.createElement(AddPluginComponentA),
};

export const addPluginB = {
    target: 'WorkspaceControlPanelButtons',
    mode: 'add',
    component: React.createElement(AddPluginComponentB),
};

export const addPluginC = {
    target: 'WindowTopBarPluginMenu',
    mode: 'add',
    component: React.createElement(AddPluginComponentC),
};

export const wrapPluginD = {
    target: 'WindowTopBarPluginMenu',
    mode: 'wrap',
    component: WrapPluginComponent,
};

export const addPluginE = {
    target: 'WindowTopBarPluginArea',
    mode: 'add',
    component: AddPluginComponentE,
};
