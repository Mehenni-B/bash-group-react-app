import { createSlice } from '@reduxjs/toolkit';
import { OrderCollectionType, OrderType, StoreOrderType } from '../../models/Order';

type SliceState = { current: StoreOrderType | null, selected: OrderType | null, list: OrderCollectionType | null, paymentId: string | null, errorMessage: string | null };

const initialState: SliceState = { current: null, list: null, selected: null, paymentId: null, errorMessage: null };

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateCurrent(state, action) {
            state.current = action.payload;
        },
        updateList(state, action) {
            state.list = action.payload;
        },
        updateSelected(state, action) {
            state.selected = action.payload;
        },
        updatePaymentId(state, action) {
            state.paymentId = action.payload;
        },
        updateError(state, action) {
            state.errorMessage = action.payload;
        },
    },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;