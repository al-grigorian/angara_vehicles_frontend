import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import VehiclesList from "./Components/VehiclesList/VehiclesList";
import VehiclePage from "./Components/VehiclePage/VehiclePage";
import {Vehicle} from "./Types";

function App() {

    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className="content-wrapper">

                    <BrowserRouter>

                        <Breadcrumbs selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/vehicles" replace />} />

                            <Route path="/vehicles" element={<VehiclesList />} />

                            <Route path="/vehicles/:id" element={<VehiclePage selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
