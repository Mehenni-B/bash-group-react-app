import { createSlice } from '@reduxjs/toolkit';
import { ServiceType } from '../../models/Service';

type SliceState = { current: ServiceType | null, list: ServiceType[] | null };

const initialState: SliceState = { current: null, list: null };

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        updateCurrent(state, action) {
            state.current = action.payload;
        },
        updateList(state, action) {
            state.list = action.payload;
        },
    },
});

export const serviceActions = serviceSlice.actions;
export default serviceSlice.reducer;