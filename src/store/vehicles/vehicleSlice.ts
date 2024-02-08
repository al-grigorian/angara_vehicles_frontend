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
		},
		updateName(state, action) {
			state.vehicle.name = action.payload
		},
		updateDescription(state, action) {
			state.vehicle.description = action.payload
		},
		updateCategory(state, action) {
			state.vehicle.category = action.payload
		},
		updatePrice(state, action) {
			state.vehicle.price = action.payload
		},
		updateImage(state, action) {
			state.vehicle.image = action.payload
		}
	}
})

export const {
	updateVehicle,
	updateName,
	updateDescription,
	updateCategory,
	updatePrice,
	updateImage
} = vehicleSlice.actions;

export default vehicleSlice.reducer;