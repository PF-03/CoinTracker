import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../../../redux/actions/index"
import { DataGrid } from '@mui/x-data-grid';
import { color } from '@mui/system';
import SearchBarAdmins from '../SearchAdmins/searchAdmins';




export default function Admins() {

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch, getAdmins])

  const allAdmins = useSelector((state: any) => state.admins)

  console.log(allAdmins)
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
    <div style={{ flex: 10 }}>
      <SearchBarAdmins/>
      <DataGrid
        rows={adminRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        sx={{
          boxShadow: 2,
          border: 2,
          color: 'white'
        }}
      />

    </div>
  )
}
