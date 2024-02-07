import {configureStore} from "@reduxjs/toolkit";

import vehicleReducer from "./vehicles/vehicleSlice"
import draftOrderReducer from "./orders/orderSlice"
import authReducer from "./users/authSlice"
import ordersReducer from "./orders/ordersSlice"
import vehiclesReducer  from "./vehicles/vehiclesSlice"

export default configureStore({
	reducer: {
		vehicle: vehicleReducer,
		vehicles: vehiclesReducer,
		order: draftOrderReducer,
		orders: ordersReducer,
		user: authReducer
	}
});