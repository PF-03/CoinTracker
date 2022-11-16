import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../../../redux/actions/index"
import { DataGrid } from '@mui/x-data-grid';
import SearchBarAdmins from '../SearchAdmins/searchAdmins';
import st from './AdminList.module.css';
import s from '../../styles/styles.module.css'
import Bubble from '../../styles/bubbles';



export default function Admins() {

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch, getAdmins])

  const allAdmins = useSelector((state: any) => state.admins)

  //console.log(allAdmins)
  const columns = [
    { field: '_id', headerName: 'Admin ID', width: 200 },
    // { field: 'profilePic', headerName: 'Profile Pic', width: 100, renderCell: (params)=>{
    //   return (
    //     <div className={st.doctorListUser}>
    //       <img classname={st.doctorListPic} src={params.row.profilePic} alt='' />
    //       {params.row.name}
    //     </div>
    //   )
    // }},
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'googleId', headerName: 'Google ID', width: 100 },
    { field: 'username', headerName: 'Username', width: 150 },
    // { field: 'password', headerName: 'Password', width: 100 },
    { field: 'mail', headerName: 'mail', width: 150 },
    { field: 'name', headerName: 'name', width: 100 },
    { field: 'lastname', headerName: 'lastname', width: 100 },
    { field: 'type', headerName: 'type', width: 150 },
    // { field: 'token', headerName: 'token', width: 50 },
    { field: 'activos', headerName: 'activos', width: 150 },
  ];

  const adminRows = allAdmins.map((Adm, index) => ({
    id: index + 1,
    _id: Adm._id,
    googleId: Adm.googleId,
    username: Adm.username,
    // password: Adm.password,
    mail: Adm.mail,
    name: Adm.name,
    lastname: Adm.lastname,
    type: Adm.type,
    // token: Adm.token,
    activos: Adm.activos
  }));


  return (
    <div className={st.userList}>
      <SearchBarAdmins />
      <Bubble size='small' color='red' top={'20%'} />
      <DataGrid
        className={s.card}
        rows={adminRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        scrollbarSize={4}
        sx={{
          boxShadow: 2,
          color: 'white'
        }}
      />
      <Bubble size='medium' color='purple' bottom='20%' right='0' />
    </div>
  )
}
