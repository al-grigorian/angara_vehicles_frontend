import "./VehiclePage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useVehicle} from "../../hooks/vehicles/useVehicle";

const VehiclePage = () => {

    const { id } = useParams<{id: string}>();
    
    const {vehicle, fetchVehicle} = useVehicle()
    
    useEffect(() => {
        id && fetchVehicle(id)
    }, [])

    if (vehicle == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/components/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{vehicle?.name}</h2>

                    <br />

                    <span>Категория: { vehicle?.category }</span>

                    <br />

                    <span>Описание: { vehicle?.description }</span>

                    <br />

                    <span>Цена: { vehicle?.price } млн рублей</span>

                </div>

            </div>

        </div>
    )
}

export default VehiclePage;