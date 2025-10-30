import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from '@/store/slices/auth-slice/auth.slice';
import accountsSlice from '@/store/slices/accounts-slice/accounts.slice';
import metaSlice from '@/store/slices/meta-slice/meta.slice';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['authState']
};

const rootReducer = combineReducers({
    authState: authSlice,
    accountsState: accountsSlice,
    metaState: metaSlice,
});

export default persistReducer(persistConfig, rootReducer);