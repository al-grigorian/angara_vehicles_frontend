import "./VehicleCard.sass"
import {Vehicle} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import CustomInput from "../CustomInput/CustomInput";
import {useEffect, useState} from "react";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import {useVehicles} from "../../hooks/vehicles/useVehicles";
import CustomLink from "../CustomLink/CustomLink";

const VehicleCard = ({ vehicle, refetch, saving }: {vehicle:Vehicle}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {deleteVehicle} = useVehicles()

    const {order, is_draft, addVehicleToOrder, deleteVehicleFromOrder} = useOrder()

    const [value, setValue] = useState(vehicle.amount)

    const handleAddVehicle = async (e) => {
        e.preventDefault()
        await addVehicleToOrder(vehicle)
        refetch()
    }

    const handleDeleteVehicleFromOrder = async (e) => {
        e.preventDefault()
        await deleteVehicleFromOrder(vehicle)
    }

    const {access_token} = useToken()

    const handleSaveValue = async () => {
        const form_data = new FormData()

        form_data.append('amount', value)

        await api.put(`rockets/${order.id}/update_component/${vehicle.id}/`, form_data, {
            headers: {
                'authorization': access_token
            }
        })
    }

    const handleDeleteVehicle = async () => {
        await deleteVehicle(vehicle)
        refetch()
    }

    useEffect(() => {
        handleSaveValue()
    }, [saving])

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={vehicle.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {vehicle.name} </h3>

                </div>

                {location.pathname.includes("orders") &&
                    <div className="card-inputs-container">
                        <CustomInput placeholder="Количество" value={value} setValue={setValue} disabled={!is_draft}/>
                    </div>
                }

                <div className="content-bottom">

                    {
                        <CustomLink to={`/vehicles/${vehicle.id}`} bg={variables.primary}>
                            Подробнее
                        </CustomLink>
                    }

                    {is_authenticated && location.pathname.includes("vehicles") &&
                        <CustomButton onClick={handleAddVehicle} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton onClick={handleDeleteVehicleFromOrder} bg={variables.red}>Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton onClick={handleSaveValue} bg={variables.green}>Сохранить</CustomButton>
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default VehicleCard;