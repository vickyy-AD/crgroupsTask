import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../modules/auth/authSlice";
import listReducer from "../../modules/list/listSlice";

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        listReducer: listReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;