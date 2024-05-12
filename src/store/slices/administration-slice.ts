import { createSlice } from '@reduxjs/toolkit';
import { AdministrationType } from '../../models/Administration';

type SliceState = { list: AdministrationType[] | null, currentId: number };

const initialState: SliceState = { list: null, currentId: 6 };

const administrationSlice = createSlice({
    name: 'administration',
    initialState,
    reducers: {
        updateList(state, action) {
            state.list = action.payload;
        },
        updateCurrentId(state, action) {
            state.currentId = action.payload;
        }
    },
});

export const administrationActions = administrationSlice.actions;
export default administrationSlice.reducer;