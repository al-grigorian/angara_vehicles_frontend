import "./VehiclesFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useVehicles} from "../../../hooks/vehicles/useVehicles";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const VehiclesFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useVehicles()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="vehicles-filters">

            <h2>Поиск комплектующих</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/vehicles/add" bg={variables.primary}>
                        Добавить реактор
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default VehiclesFilters