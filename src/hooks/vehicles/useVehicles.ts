import {useDispatch, useSelector} from 'react-redux';
import {
	updateVehicles,
	updateQuery
} from "../../store/vehicles/vehiclesSlice";
import {api} from "../../utils/api";
import {useOrder} from "../orders/useOrder";
import {useToken} from "../users/useToken";

export function useVehicles() {
	const vehicles = useSelector(state => state.vehicles.vehicles);
	const query = useSelector(state => state.vehicles.query);

	const {access_token} = useToken()

	const {setOrder, setOrderId} = useOrder()

	const dispatch = useDispatch()

	const setVehicles = (value) => {
		dispatch(updateVehicles(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchVehicles = async (navigate=null) => {

		const {data} = await api.get(`components/search/`, {
			params: {
				component: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_order_id = data["draft_order_id"]
		setOrderId(draft_order_id)

		if (!draft_order_id) {
			setOrder(undefined)
			navigate && navigate("/")
		}

		return data["vehicles"]
	}

	const deleteVehicle = async (vehicle) => {

		await api.delete(`components/${vehicle}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}


	return {
		vehicles,
		setVehicles,
		query,
		setQuery,
		searchVehicles,
		deleteVehicle
	};
}