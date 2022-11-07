import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../../redux/actions/index";
import st from './UserList.module.css';
import { DataGrid } from '@mui/x-data-grid';
import BlockIcon from '@mui/icons-material/Block';
// import  userData  from '../../../dummyData';
import { Link } from 'react-router-dom';

export default function UserList() {

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, getUsers])

  const allUsers = useSelector((state:any) => state.usersCopy);

  const handleDelete = (_id) => {
    dispatch(deleteUser(_id))
    alert("User successfully updated");
    window.location.reload()
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    // { field: 'pic', headerName: 'Pic', width: 100, renderCell: (params)=>{
    //   return (
    //     <div className={st.userListUser}>
    //       <img classname={st.userListPic} src={params.row.pic} alt='' />
    //       {params.row.name}
    //     </div>
    //   )
    // }},
    { field: '_id', headerName: 'User ID', width: 130 },
    { field: 'googleId', headerName: 'Google ID', width: 130 },
    { field: 'password', headerName: 'Password', width: 130 },
    { field: 'mail', headerName: 'Email', width: 150 },
    { field: 'name', headerName: 'Name', type: 'date', width: 120 },
    { field: 'lastname', headerName: 'Lastname', width: 120 },
    { field: 'type', headerName: 'Type', width: 75 },
    // { field: 'token', headerName: 'Token',  width: 100 },
    { field: 'activos', headerName: 'Activo', width: 75 },
    {
      field: 'actions', headerName: 'Actions', width: 130, renderCell: (params) => {
        return (
          <>
            <Link to={'/admin/user/' + params.row._id}>
              <button className={st.userListEdit}>Edit</button>
            </Link>
            <BlockIcon className={st.userListDelete} onClick={() => handleDelete(params.row._id)} />
          </>
        )
      }
    }
  ];

  let userData = allUsers.map((pat, index) => ({
    id: index + 1,
    _id: pat._id,
    googleId: pat.googleId,
    username: pat.username,
    password: pat.password,
    mail: pat.mail,
    name: pat.name,
    lastname: pat.lastname,
    type: pat.type,
    // token: pat.token,
    activos: pat.activos
  }));


  return (
    <div className={st.userList}>

      <DataGrid
        rows={userData}
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
};
