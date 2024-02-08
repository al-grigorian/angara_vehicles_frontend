import {useDispatch, useSelector} from 'react-redux';
import {
	updateVehicle,
	updateName,
	updateDescription,
	updateCategory,
	updateImage, updatePrice
} from "../../store/vehicles/vehicleSlice";
import {api} from "../../utils/api";

export function useVehicle() {
	const vehicle = useSelector(state => state.vehicle.vehicle);

	const dispatch = useDispatch()

	const setVehicle = (value) => {
		dispatch(updateVehicle(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setCategory = (value) => {
		dispatch(updateCategory(value))
	}

	const setPrice = (value) => {
		dispatch(updatePrice(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchVehicle = async (id) => {

		const {data} = await api.get(`components/${id}`);

		setVehicle(data)

	};

	return {
		vehicle,
		setVehicle,
		fetchVehicle,
		setName,
		setDescription,
		setCategory,
		setPrice,
		setImage
	};
}