import React from 'react'
import st from './TopBar.module.css'
import logo from "../../../image/logo.png"
import { Link } from 'react-router-dom'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LanguajeIcon from '@mui/icons-material/Language'
import SettingsIcon from '@mui/icons-material/Settings'


import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TopBar() {

    // const handleLogOut = async (e) => {
    //     e.preventDefault()
    //     try {
    //         localStorage.removeItem("id")
    //         localStorage.removeItem("token")
    //         window.location.reload(true)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (

        <nav className={st.topbar}>
            <div className={st.topbarWrapper}>
                <div className={st.topLeft}>
                    <img className={st.logo} src={logo} alt="Logo Health4U" />
                </div>
                <div className={st.topRight}>
                    {/* style={{ "text-decoration": "none", "color": "#141616" }} */}
                    <Link to='/adminView/helpusmail' >
                        <div className={st.topbarIconsContainer}>
                            <NotificationsNoneIcon />
                        </div>
                    </Link>

                    <div className={st.topbarIconsContainer}>
                        <LanguajeIcon />
                    </div>

                    <div className={st.topbarIconsContainer}>
                        <SettingsIcon />
                    </div>

                    <Dropdown>
                        <Dropdown.Toggle variant='#D7FCF1' id="dropdown-basic">
                            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/surgeon-5682858-4731206.png" alt="Foto de perfil" className={st.topAvatar} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* onClick={handleLogOut} */}
                            <Dropdown.Item>Sign Out</Dropdown.Item>
                            <Dropdown.Item href="http://www.gmail.com">Gmail</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </div>
        </nav>
    )
};


