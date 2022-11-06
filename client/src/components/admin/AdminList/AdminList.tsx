import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../../../redux/actions/index"
import { DataGrid } from '@mui/x-data-grid';




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
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'googleId', headerName: 'Name', width: 150 },
    { field: 'username', headerName: 'Email', width: 180 },
    { field: 'password', headerName: 'Password', width: 150 },
    { field: 'mail', headerName: 'mail', width: 150 },
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'lastname', headerName: 'lastname', width: 150 },
    { field: 'type', headerName: 'type', width: 150 },
    { field: 'token', headerName: 'token', width: 150 },
    { field: 'activos', headerName: 'activos', width: 150 },
  ];

  const adminRows = allAdmins.map((Adm, index) => ({
    id: index + 1,
    _id: Adm._id,
    googleId: Adm.googleId,
    username: Adm.username,
    password: Adm.password,
    mail: Adm.mail,
    name: Adm.name,
    lastname: Adm.lastname,
    type: Adm.type,
    token: Adm.token,
    activos: Adm.activos
  }));


  return (
    <div style={{ flex: 7 }}>

      <DataGrid
        rows={adminRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />

    </div>
  )
}
