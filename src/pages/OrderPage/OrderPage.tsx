import {useEffect, useState} from "react";
import {useOrder} from "../../hooks/orders/useOrder";
import {useNavigate, useParams} from "react-router-dom"
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import "./OrderPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";

const OrderPage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {order, fetchOrder, saveOrder, sendOrder, deleteOrder, setOrder, setOrderId} = useOrder()

    const [saving, setSaving] = useState(false)

    const handleSave = () => setSaving(!saving)

    useEffect(() => {

        if (!id || !is_authenticated) {
            navigate("/")
        }

        setOrderId(id)
        fetchOrder(id)

        return () => {
            setOrder(undefined)
        };
    }, [])

    if (order == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendOrder = async() => {
        handleSave()
        await saveOrder()
        await sendOrder()
        navigate("/orders")
    }

    const onDeleteOrder = async () => {
        await deleteOrder()
        navigate("/vehicles")
    }

    const cards = order.vehicles.map(vehicle  => (
        <VehicleCard vehicle={vehicle} key={vehicle.id} saving={saving} />
    ))

    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={handleSave} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendOrder} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteOrder} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = order.status == 1

    const completed = [3, 4].includes(order.status)

    return (
        <div className="order-page-wrapper">

            <div className="order-vehicles-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новый ракетоноситель" :  "Ракетоноситель №" + order.id}</h3>
                </div>

                <div className="order-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == order.status).name}</span>
                    <span>Дата создания: {moment(order.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(order.status) && <span>Дата формирования: {moment(order.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(order.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                </div>

                <div className="title">
                    <h3>Комплектующие</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default OrderPage