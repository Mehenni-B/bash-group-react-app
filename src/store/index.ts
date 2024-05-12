import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import {
    userReducer,
    toastReducer,
    administrationReducer,
    serviceReducer,
    orderReducer,
} from './slices/_index';

const store = configureStore({
    reducer: {
        user: userReducer,
        toast: toastReducer,
        administration: administrationReducer,
        service: serviceReducer,
        order: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;