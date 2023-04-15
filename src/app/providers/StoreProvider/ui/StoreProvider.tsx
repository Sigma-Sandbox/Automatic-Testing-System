import { DeepPartial } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";
import { Provider } from "react-redux";

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
    const { children, initialState } = props;

    const store = createReduxStore(initialState as StateSchema);

    return <Provider store={store}>{children}</Provider>;
};
