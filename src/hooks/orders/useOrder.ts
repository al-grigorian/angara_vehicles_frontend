import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateOrderId,
	updatePassegeDate,
	updatePersonCount, updatePassegeTime
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.order.order)
	const order_id = useSelector(state => state.order.order_id)
	const passege_date = useSelector(state => state.order.passege_date)
	const passege_time = useSelector(state => state.order.passege_time)
	const person_count = useSelector(state => state.order.person_count)

	const navigate = useNavigate()

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setPassegeDate = (value) => {
		dispatch(updatePassegeDate(value))
	}

	const setPassegeTime = (value) => {
		dispatch(updatePassegeTime(value))
	}

	const setPersonCount = (value) => {
		dispatch(updatePersonCount(value))
	}

	const setOrderId = (value) => {
		dispatch(updateOrderId(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`rockets/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
			setPersonCount(undefined)
			setPassegeDate(undefined)
			setPassegeTime(undefined)
		}
	}

	const deleteOrder = async () => {

		const response = await api.delete(`rockets/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
			setPersonCount(undefined)
			setPassegeDate(undefined)
			setPassegeTime(undefined)
		}

	}

	const saveOrder = async () => {

		const form_data = new FormData()

		if (passege_date && passege_time) {
			form_data.append('passege_date', passege_date + " " + passege_time)
		}

		form_data.append('person_count', person_count)

		await api.put(`rockets/${order.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`rockets/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)
		setPersonCount(data["person_count"])
		setPassegeDate(data["passege_date"].split("T")[0])
		setPassegeTime(data["passege_date"].split("T")[1].split("+")[0].split(".")[0])
	}

	const addVehicleToOrder = async (vehicle) => {
		await api.post(`components/${vehicle.id}/add_to_rocket/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteVehicleFromOrder = async (vehicle) => {
		const response = await api.delete(`rockets/${order.id}/delete_component/${vehicle.id}/`, {
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
		passege_date,
		passege_time,
		person_count,
		setOrder,
		setPassegeDate,
		setPassegeTime,
		setPersonCount,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addVehicleToOrder,
		deleteVehicleFromOrder,
		setOrderId
	};
}