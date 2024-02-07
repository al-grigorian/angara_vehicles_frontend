import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	vehicle: undefined,
};

const vehicleSlice = createSlice({
	name: 'vehicle',
	initialState: initialState,
	reducers: {
		updateVehicle(state, action) {
			state.vehicle = action.payload
		}
	}
})

export const {
	updateVehicle
} = vehicleSlice.actions;

export default vehicleSlice.reducer;