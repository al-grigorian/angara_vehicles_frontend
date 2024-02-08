import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import VehiclePage from "./pages/VehiclePage/VehiclePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import VehiclesPage from "./pages/VehiclesPage/VehiclesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import OrderConstructor from "./components/OrderConstructor/OrderConstructor";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import VehicleEditPage from "./pages/VehicleEditPage/VehicleEditPage";
import VehicleAddPage from "./pages/VehicleAddPage/VehicleAddPage";
import VehiclesTableWrapper from "./pages/VehiclesPage/VehiclesTableWrapper/VehiclesTableWrapper";
import VehiclesList from "./pages/VehiclesPage/VehiclesList/VehiclesList";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("vehicles") && <OrderConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/hangar">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/vehicles" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/vehicles" element={<VehiclesList />} />

                                    <Route path="/vehicles-table" element={<VehiclesTableWrapper />} />

                                    <Route path="/vehicles/add" element={<VehicleAddPage />} />

                                    <Route path="/vehicles/:id" element={<VehiclePage />} />

                                    <Route path="/vehicles/:id/edit" element={<VehicleEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/orders/:id" element={<OrderPage />} />

                                    <Route path="/orders" element={<OrdersPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
