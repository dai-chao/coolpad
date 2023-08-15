import * as React from "react";

export const CustomContext = React.createContext(undefined);
export const CustomDispatchContext = React.createContext(undefined);

export function getInitialState() {
    return {
        componentsOpen: false,
    }
}

export function customReducer(state: any, action: any) {
    if (action.type === 'components:toggle') {
        return {
            ...state,
            componentsOpen: !state.componentsOpen,
        };
    }

    throw Error('Unknown action.');
}
