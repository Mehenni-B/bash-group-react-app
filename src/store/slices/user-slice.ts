import { createSlice } from '@reduxjs/toolkit';
import { UserType, RegisterType } from '../../models/User';

type SliceState = {
    current: UserType | null,
    registerErrorMessage: string | null,
    emailErrorMessage: string | null,
    phoneErrorMessage: string | null,
    phoneUUID: string | null,
    emailUUID: string | null,
    registerData: RegisterType | null,
};

const initialState: SliceState = {
    current: null,
    registerErrorMessage: null,
    emailErrorMessage: null,
    phoneErrorMessage: null,
    phoneUUID: null,
    emailUUID: null,
    registerData: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateCurrent(state, action) {
            state.current = action.payload;
        },
        updateRegisterError(state, action) {
            state.registerErrorMessage = action.payload;
        },
        updateEmailError(state, action) {
            state.emailErrorMessage = action.payload;
        },
        updatePhoneError(state, action) {
            state.phoneErrorMessage = action.payload;
        },
        updatePhoneUUID(state, action) {
            state.phoneUUID = action.payload;
        },
        updateEmailUUID(state, action) {
            state.emailUUID = action.payload;
        },
        updateRegisterData(state, action) {
            state.registerData = action.payload;
        }
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;