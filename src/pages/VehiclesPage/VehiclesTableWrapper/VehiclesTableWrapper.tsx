import {useVehicles} from "../../../hooks/vehicles/useVehicles";
import {useQuery} from "react-query";
import VehiclesTable from "./VehiclesTable/VehiclesTable";

const VehiclesTableWrapper = () => {

    const {searchVehicles} = useVehicles()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["vehicles"],
        () => searchVehicles(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <VehiclesTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default VehiclesTableWrapper