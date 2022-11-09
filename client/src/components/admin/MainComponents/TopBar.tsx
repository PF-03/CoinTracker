import st from './TopBar.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { PrivateRoutes, PublicRouts } from "../../../rutas/rutas"

export default function TopBar() {
    const dispatch: any = useDispatch();
    const nav = useNavigate();

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
    const logout = async () => {
        axios.get(`/logout`, {
            withCredentials: true,
        })
            .then((res: any) => console.log(res.data));

        dispatch({ type: "RESET" });
        nav(PublicRouts.LANDING);
    };

    return (

        <nav className={st.topbar}>
            <div className={st.topbarWrapper}>
                <div className={st.title}>
                    <a>CoinTracker - Admin </a>
                </div>
                <div className={st.topRight}>
                    {/* style={{ "text-decoration": "none", "color": "#141616" }} */}
                    <Link to='/admin/helpusmail' >
                        <div className={st.topbarIconsContainer}>
                            <NotificationsNoneIcon />
                        </div>
                    </Link>

                    <Dropdown>
                        <Dropdown.Toggle variant='#D7FCF1' id="dropdown-basic">
                            <img src="https://w7.pngwing.com/pngs/429/434/png-transparent-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome-silhouette-thumbnail.png" className={st.topAvatar} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* onClick={handleLogOut} */}
                            <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
                            <Dropdown.Item href="http://www.gmail.com">Gmail</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </div>
        </nav>
    )
};


