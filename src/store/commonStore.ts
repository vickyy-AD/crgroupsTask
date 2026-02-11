import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import listReducer from "./slices/listSlice";

const commonStore = configureStore({
    reducer: {
        authReducer: authReducer,
        listReducer: listReducer,
    },
});

export default commonStore;

export type RootState = ReturnType<typeof commonStore.getState>;
export type AppDispatch = typeof commonStore.dispatch;