import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {Vehicle} from "../../Types";
import {Dispatch} from "react";

const Breadcrumbs = ({ selectedVehicle, setSelectedVehicle }: {selectedVehicle: Vehicle | undefined, setSelectedVehicle: Dispatch<Vehicle | undefined> }) => {

    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (crumb == "vehicles")
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={() => setSelectedVehicle(undefined)}>
                        Комплектующие
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('vehicles/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        { selectedVehicle?.name }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;