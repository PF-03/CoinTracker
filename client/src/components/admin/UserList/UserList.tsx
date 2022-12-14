import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  deleteUser,
  getUserProfile,
} from "../../../redux/actions/index";
import st from "./UserList.module.css";
import s from "../../styles/styles.module.css";
import { DataGrid } from "@mui/x-data-grid";
import BlockIcon from "@mui/icons-material/Block";
// import  userData  from '../../../dummyData';
import { useNavigate } from "react-router-dom";
import SearchBarUsers from "../SearchUsers/searchUsers";
import Swal from "sweetalert2";
import Bubble from "../../styles/bubbles";

export default function UserList() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, getUsers]);

  const allUsers = useSelector((state: any) => state.usersCopy);

  const editar = async (e, id) => {
    e.preventDefault();
    await dispatch(getUserProfile(id));
    await navigate("/admin/user/" + id);
  };
  const handleDelete = (_id) => {
    dispatch(deleteUser(_id));
    Swal.fire({
      icon: "success",
      title: "User sucessfully updated!",
      confirmButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    // { field: 'pic', headerName: 'Pic', width: 100, renderCell: (params)=>{
    //   return (
    //     <div className={st.userListUser}>
    //       <img classname={st.userListPic} src={params.row.pic} alt='' />
    //       {params.row.name}
    //     </div>
    //   )
    // }},
    { field: "_id", headerName: "User ID", width: 130 },
    { field: "googleId", headerName: "Google ID", width: 130 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "mail", headerName: "Email", width: 150 },
    { field: "name", headerName: "Name", type: "date", width: 120 },
    { field: "lastname", headerName: "Lastname", width: 120 },
    { field: "type", headerName: "Type", width: 100 },
    // { field: 'token', headerName: 'Token',  width: 100 },
    { field: "activos", headerName: "Activo", width: 75 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/admin/user/" + params.row._id}> */}
            <button
              className={st.userListEdit}
              onClick={(e) => editar(e, params.row._id)}
            >
              Edit
            </button>
            {/*  </Link> */}
            <BlockIcon
              className={st.userListDelete}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
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
    activos: pat.activos,
  }));

  return (
    <div className={st.userList}>
      <SearchBarUsers />
      <Bubble right={0} top={0} color="purple" size="medium" />
      <DataGrid
        className={s.card}
        rows={userData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        sx={{
          color: "white",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </div>
  );
}
