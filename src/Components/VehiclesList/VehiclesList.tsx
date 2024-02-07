import "./VehiclesList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import VehicleCard from "./VehicleCard/VehicleCard";
import {iVehiclesMock, requestTime} from "../../Consts";
import {Vehicle} from "../../Types";

const VehiclesList = () => {

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchVehicles = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/components/search?&component=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const vehicles = raw["vehicles"]

            setVehicles(vehicles)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {
        setIsMock(true)
        setVehicles(iVehiclesMock.filter(vehicle => vehicle.name.toLowerCase().includes(query.toLowerCase())))
    }

    useEffect(() => {
        searchVehicles()
    }, [])

    const cards = vehicles.map(vehicle  => (
        <VehicleCard vehicle={vehicle} key={vehicle.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchVehicles()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Поиск комплектующих</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default VehiclesList;