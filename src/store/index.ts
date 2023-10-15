import storage from 'redux-persist/lib/storage';
import { combineReducers,configureStore,AnyAction } from '@reduxjs/toolkit';
import{ persistReducer,  persistStore } from 'redux-persist';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import authSlice from './reducer/auth.slice';
import TasksSlice from './reducer/Tasks.slice';
import alertSlice from './slice/alertSlice';

const persistConfig = {
    key:'root',
    storage,
}

const rootReducer = combineReducers({
auth:authSlice,
TasksUser:TasksSlice,
alert:alertSlice
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk]
})

export  const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState,any,AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export default store