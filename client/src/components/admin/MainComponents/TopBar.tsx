import st from './TopBar.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { PrivateRoutes, PublicRouts } from "../../../rutas/rutas";

import iconCoinTracker from '../../../assets/ethereum-icon-purple.svg';
import iconUser from '../../../assets/images.png'
import iconLogOut from "../../../assets/iconLogOut.png";
import Swal from 'sweetalert2';


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
        Swal.fire({
            icon: 'success',
            title: 'Success logout',
            confirmButtonText: "Close",
        });
    };

    return (

        <nav className={st.topbar}>
            <div className={st.topbarWrapper}>
                <div className={st.title}>
                    <div>
                        <img src={iconCoinTracker} className={st.imgEth} />
                        <h1>CoinTracker - Admin </h1>
                    </div>
                </div>
                <div className={st.topRight}>
                    {/* style={{ "text-decoration": "none", "color": "#141616" }} */}

                    <Link to='/admin/helpusmail' >
                        <div className={st.topbarIconsContainer}>
                            <NotificationsNoneIcon />
                        </div>
                    </Link>


                    <Link to='/' >
                        <span onClick={() => logout()} className={st.data} >
                            <img className={st.icon} src={iconLogOut} alt="home" />
                        </span>
                    </Link>
                    <a target='_blank' href="http://www.gmail.com" className={st.link}></a>



                </div>
            </div>
        </nav >
    )
};


