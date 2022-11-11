import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUserProfile } from '../../../redux/actions/index'
import st from './User.module.css'
import UserEdit from './UserEdit'
import { PermIdentity, AlternateEmail, ManageAccounts } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';

export default function User() {

    const { userId } = useParams(); //usar el mismo nombre de variable que en la ruta principal
    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(getUserProfile(userId));
    }, [getUserProfile]);

    let user = useSelector((state: any) => state.userDetail[0]);

    let props = {
        id: '',
        googleId: '',
        username: '',
        password: '',
        mail: '',
        name: '',
        lastname: '',
        type: '',
        token: '',
        activos: true,
    }

    user ? props = {
        id: user._id,
        googleId: user.googleId,
        username: user.username,
        password: user.password,
        mail: user.mail,
        name: user.name,
        lastname: user.lastname,
        type: user.type,
        token: user.token,
        activos: user.activos
    } : console.log('Algo esta pasando')


    return (
        <div className={st.user}>

            <div className={st.userTitleContainer}>
                <h1 className={st.userTitle}>Edit user</h1>
            </div>

            <div className={st.userContainer}>
                <div className={st.userShow}>
                    <div className={st.userShowTop}>
                        {/* <img src={props.image} alt="Profile Pict" className={st.userShowImg} /> */}
                    </div>

                    <div className={st.userShowBottom}>
                        <span className={st.userShowTitle}>Account Details</span>

                        <div className={st.userShowInfo}>
                            <PermIdentity className={st.userShowIcon} />
                            <span className={st.userShowInfo}>ID: {props.id}</span>
                        </div>
                        <div className={st.userShowInfo}>
                            <AlternateEmail className={st.userShowIcon} />
                            <span className={st.userShowInfo}>Email: {props.mail}</span>
                        </div>
                        <div className={st.userShowInfo}>
                            <ManageAccounts className={st.userShowIcon} />
                            <span className={st.userShowInfo}>Role: {props.type}</span>
                        </div>
                        <div className={st.userShowInfo}>
                            <AccountCircleIcon className={st.userShowIcon} />
                            <span className={st.userShowInfo}>Name: {props.name}</span>
                        </div>
                        <div className={st.userShowInfo}>
                            <AccountCircleIcon className={st.userShowIcon} />
                            <span className={st.userShowInfo}>Lastname: {props.lastname}</span>
                        </div>
                        <div className={st.userShowInfo}>
                            <SecurityIcon className={st.userShowIcon} />
                            <span className={st.userShowInfo}>Activo: {props.activos.toString()}</span>
                        </div>
                    </div>
                </div>

                <div className={st.userUpdate}>
                    <UserEdit {...props} />
                </div>
            </div>
        </div>
    )
};
