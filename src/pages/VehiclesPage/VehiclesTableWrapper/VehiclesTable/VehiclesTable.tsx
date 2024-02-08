import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {Link, useNavigate } from "react-router-dom";
import VehiclesFilters from "../../VehiclesFilters/VehiclesFilters";
import CustomLink from "../../../../components/CustomLink/CustomLink";
import {variables} from "../../../../utils/consts";
import { useVehicles } from "../../../../hooks/vehicles/useVehicles";
import CustomButton from "../../../../components/CustomButton/CustomButton";

const VehiclesTable = ({isLoading, data, isSuccess, refetch}) => {

    const {deleteVehicle} = useVehicles()

    const handleDeleteVehicle = async (id: number) => {
        await deleteVehicle(id)
        refetch()
    }
    
    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Категория",
            accessor: "category",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Цена (млн рублей)",
            accessor: "price",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Редактирование",
            accessor: "edit",
            Cell: ({ cell }) => (<CustomLink
                to={`/vehicles/${cell.row.values.id}/edit`} bg={variables.primary}
              >
                Редактировать
              </CustomLink>)
        },
        
        {
            Header: "Удаление",
            accessor: "delete",
            Cell: ({ cell }) => (<CustomButton 
                onClick={() => handleDeleteVehicle(cell.row.values.id)} bg={variables.red}>
                Удалить
                </CustomButton>)
        }
        
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCityPage = (vehicle_id) => {
        navigate(`/components/${vehicle_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <VehiclesFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default VehiclesTable