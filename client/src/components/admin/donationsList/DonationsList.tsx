import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDonations } from "../../../redux/actions/index";
import st from './DonationsList.module.css';
import { DataGrid } from '@mui/x-data-grid';
import BlockIcon from '@mui/icons-material/Block';
// import  userData  from '../../../dummyData';
import { Link } from 'react-router-dom';

export default function DonationsList() {

    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getDonations());
    }, [dispatch, getDonations])

    const allDonations = useSelector((state: any) => state.donations);

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
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'mail', headerName: 'Email', width: 150 },
        { field: 'amount', headerName: 'Amount', type: 'date', width: 120 }
    ];

    const userData = allDonations.map((pat, index) => ({
        id: index + 1,
        _id: pat._id,
        username: pat.username,
        mail: pat.mail,
        amount: pat.amount,
    }));


    return (
        <div className={st.userList}>

            <DataGrid
                rows={userData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
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
