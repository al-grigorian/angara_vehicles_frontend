import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	order: undefined,
	order_id: undefined,
	passege_date: undefined,
	passege_time: undefined,
	person_count: undefined
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updatePassegeDate(state, action) {
			state.passege_date = action.payload
		},
		updatePassegeTime(state, action) {
			state.passege_time = action.payload
		},
		updatePersonCount(state, action) {
			state.person_count = action.payload
		},
		updateOrderId(state, action) {
			state.order_id = action.payload
		}
	}
})

export const {
	updateOrder,
	updatePassegeDate,
	updatePassegeTime,
	updatePersonCount,
	updateOrderId
} = orderSlice.actions;

export default orderSlice.reducer;