import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDonations } from "../../../redux/actions/index";
import st from './DonationsList.module.css';
import { DataGrid } from '@mui/x-data-grid';
// import  userData  from '../../../dummyData';
import DonationChart from './DonationChart/DonationChart';
import OrderDonations from './ordenamiento';


export default function DonationsList() {

    const dispatch: any = useDispatch();

    const allDonations = useSelector((state: any) => state.donations);

    
    useEffect(() => {
        dispatch(getDonations());
    }, [dispatch, getDonations])
    
    let userData = allDonations.map((pat, index) => ({
        id: index + 1,
        _id: pat._id,
        username: pat.username,
        mail: pat.mail,
        amount: pat.amount,
    }));
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: '_id', headerName: 'User ID', width: 250 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'mail', headerName: 'Email', width: 250 },
        { field: 'amount', headerName: 'Amount', type: 'date', width: 200 }
    ];


    return (
        <div className={st.userList}>

            <OrderDonations />
            <DataGrid
                rows={userData}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                sx={{
                    boxShadow: 2,
                    border: 2,
                    color: 'white'
                }}
            />

            <DonationChart />

        </div>
    )
};