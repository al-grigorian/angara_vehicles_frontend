import "./VehiclesList.sass"
import VehicleCard from "../../../components/VehicleCard/VehicleCard";
import {useVehicles} from "../../../hooks/vehicles/useVehicles";
import {useQuery} from "react-query";
import VehiclesFilters from "../VehiclesFilters/VehiclesFilters";

const VehiclesList = () => {

    const {searchVehicles} = useVehicles()

    const { isLoading, data, refetch } = useQuery(
        ["vehicles"],
        () => searchVehicles(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(vehicle  => (
        <VehicleCard vehicle={vehicle} key={vehicle.id} refetch={refetch}/>
    ))

    return (
        <div className="vehicles-list-wrapper">

            <VehiclesFilters refetch={refetch}/>

            <div className="vehicles-list">
                { cards }
            </div>

        </div>
    )
}

export default VehiclesList;