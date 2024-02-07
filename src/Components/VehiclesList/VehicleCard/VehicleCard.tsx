import "./VehicleCard.sass"
import {Vehicle} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const VehicleCard = ({ vehicle, isMock }: {vehicle:Vehicle, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/components/${vehicle.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {vehicle.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/vehicles/${vehicle.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default VehicleCard;