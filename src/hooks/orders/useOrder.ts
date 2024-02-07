import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateOrderId,
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.order.order)
	const order_id = useSelector(state => state.order.order_id)

	const navigate = useNavigate()

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setOrderId = (value) => {
		dispatch(updateOrderId(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}
	}

	const deleteOrder = async () => {

		const response = await api.delete(`orders/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}

	}

	const saveOrder = async () => {

		await api.put(`orders/${order.id}/update/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)
	}

	const addVehicleToOrder = async (vehicle) => {
		await api.post(`vehicles/${vehicle.id}/add_to_order/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteVehicleFromOrder = async (vehicle) => {
		const response = await api.delete(`orders/${order.id}/delete_vehicle/${vehicle.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchOrder(order_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		order,
		order_id,
		is_draft,
		setOrder,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addVehicleToOrder,
		deleteVehicleFromOrder,
		setOrderId
	};
}