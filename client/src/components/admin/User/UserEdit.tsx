import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
// import Clou from "../../ImageCloudinary/ImageCloudinary";
import st from './UserEdit.module.css'
import { putProfileAdmin } from './../../../redux/actions/index';

export default function UserEdit(props) {
    // console.log('HOLA SOY PROPS', props)
    const dispatch: any = useDispatch()

    const [input, setInput] = useState({
        id: props.id,
        googleId: props.googleId,
        username: props.username,
        password: props.password,
        mail: props.mail,
        name: props.name,
        lastname: props.lastname,
        type: props.type,
        token: props.token,
        activos: props.activos
    })

    const handleChange = (e) => {
        e.preventDefault();
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log(e.target.name)
        if (e.target.name == 'update') {
            dispatch(putProfileAdmin(props.id, input))
            setNav(true)
        }
    };

    const [nav, setNav] = useState(false)

    return (

        <div className={st.userUpdate}>
            <span className={st.userUpdateTitle}>Edit</span>
            <form onSubmit={handleUpdate} className={st.userUpdateForm}>
                <div className={st.userUpdateLeft}>
                    <div className={st.userUpdateItem}>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder={props.username}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Mail</label>
                        <input
                            type="email"
                            name="mail"
                            placeholder={props.mail}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder={props.name}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Lastname</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder={props.lastname}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Role</label>
                        <input type="text" disabled={true} placeholder={props.type} className={st.userUpdateInput} />
                    </div>

                    <div className={st.userUpdateItem}>
                        <label>Activo</label>
                        <input
                            type="text"
                            name="activos"
                            placeholder={props.activos.toString()}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)} />
                    </div>


                </div>
                <div className={st.userUpdateRight}>
                    {/* <div className={st.userUpdateUpload}>
                        <img className={st.userUpdateImg} src={props.image} alt="Profile Pic" />
                        <label htmlFor="file">
                            <DriveFolderUpload className={st.userUpdateIcon}/>
                            <Clou
                            seteditinput={setInput}
                            editinput={input}
                        /> 
                        </label>
                        <input name="image" type="file" id='file' style={{ display: "none" }} onChange={(e) => handleChange(e)} />
                    </div> */}
                    <button name='update' onClick={handleUpdate} className={st.userUpdateBotton}>Update</button>
                </div>
            </form>
            {nav ? <Navigate to={'/admin/users'} /> : null}
        </div>
    )
};
