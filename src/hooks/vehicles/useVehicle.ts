import {useDispatch, useSelector} from 'react-redux';
import {
	updateVehicle
} from "../../store/vehicles/vehicleSlice";
import {api} from "../../utils/api";

export function useVehicle() {
	const vehicle = useSelector(state => state.vehicle.vehicle);

	const dispatch = useDispatch()

	const setVehicle = (value) => {
		dispatch(updateVehicle(value))
	}

	const fetchVehicle = async (id) => {

		const {data} = await api.get(`vehicles/${id}`);

		setVehicle(data)

	};

	return {
		vehicle,
		setVehicle,
		fetchVehicle
	};
}