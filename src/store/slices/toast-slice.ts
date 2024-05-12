import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

type ToastType = { title: string, message: string, status: AlertColor| undefined};
type SliceState = { value: ToastType | null, index: number };

const initialState: SliceState = { value: null, index: 0 }

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        display(state, action) {
            state.value = action.payload;
            state.index++;
        },
        reset(state) {
            state.value = null;
        }
    },
});


export { type ToastType };
export const toastActions = toastSlice.actions;
export default toastSlice.reducer;