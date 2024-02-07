import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	vehicles: [],
	query: ""
};

const vehiclesSlice = createSlice({
	name: 'vehicles',
	initialState: initialState,
	reducers: {
		updateVehicles(state, action) {
			state.vehicles = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateVehicles,
	updateQuery
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;