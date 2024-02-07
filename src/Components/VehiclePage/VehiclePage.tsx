import "./VehiclePage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iVehiclesMock, requestTime} from "../../Consts";
import {Vehicle} from "../../Types";
import mockImage from "/src/assets/mock.png"

const VehiclePage = ({ selectedVehicle, setSelectedVehicle }: { selectedVehicle:Vehicle | undefined, setSelectedVehicle: Dispatch<Vehicle | undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/components/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const vehicle: Vehicle = await response.json()

            setSelectedVehicle(vehicle)
            setIsMock(false)

        } catch {
            CreateMock()
        }

    };

    const CreateMock = () => {
        id && setSelectedVehicle(iVehiclesMock.find((vehicle:Vehicle) => vehicle?.id == parseInt(id)))
        setIsMock(true)
    }

    useEffect(() => {
        fetchData()

        return () => {
            setSelectedVehicle(undefined)
        }
    }, [])

    const img = `http://127.0.0.1:8000/api/components/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedVehicle?.name}</h2>

                    <br />

                    <span>Категория: { selectedVehicle?.category }</span>

                    <br />

                    <span>Описание: { selectedVehicle?.description }</span>

                    <br />

                    <span>Цена: { selectedVehicle?.price } млн рублей</span>

                </div>

            </div>

        </div>
    )
}

export default VehiclePage;