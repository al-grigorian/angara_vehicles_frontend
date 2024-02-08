import "./NavMenu.sass"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";

const NavMenu = () => {

    const {is_moderator, is_authenticated, auth, user_name} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        auth()
    }, [])

    return (
        <div>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/vehicles" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                    <span>Комплектующие</span>
                </Link>

                {is_moderator &&
                    <Link to="/vehicles-table" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Таблица комплектующих</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/orders" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Ракетоносители</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/profile" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>{user_name}</span>
                    </Link>
                }

                {!is_authenticated &&
                    <Link to="/login" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Вход</span>
                    </Link>
                }

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default NavMenu;