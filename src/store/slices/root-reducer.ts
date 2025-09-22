import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from '@/store/slices/auth-slice/auth.slice'

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['authState']
};

const rootReducer = combineReducers({
    authState: authSlice,
});

export default persistReducer(persistConfig, rootReducer);