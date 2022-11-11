import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDonations, orderDonations} from "../../../redux/actions/index";
import st from './DonationsList.module.css';
import { DataGrid } from '@mui/x-data-grid';
// import  userData  from '../../../dummyData';
import DonationChart from './DonationChart/DonationChart';
import OrderDonations from './ordenamiento';
import Donation from './Donation';
import css from '../DonationsList/DonationsList.module.css';


export default function DonationsList() {

    const dispatch: any = useDispatch();

    const allDonations = useSelector((state: any) => state.donations);
    
    
   
    let userData = allDonations.map((pat, index) => ({
        id: index + 1,
        _id: pat._id,
        username: pat.username,
        mail: pat.mail,
        amount: pat.amount,
    }));
    
    useEffect(() => {
        dispatch(getDonations());
        
    }, [dispatch])
    
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: '_id', headerName: 'User ID', width: 250 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'mail', headerName: 'Email', width: 250 },
        { field: 'amount', headerName: 'Amount', type: 'date', width: 200 }
    ];
    function Handle() {
        const input = document.getElementById('selectDonations') as HTMLInputElement | null;
        dispatch(orderDonations(input.value, allDonations));
        // this.forceUpdate();
        //console.log(allDonations)
    }


    return (
        <div className={st.userList}>
            <div >
            <select id='selectDonations' onChange={Handle}>
               
                <option>Mayor a Menor</option>
                <option>Menor a Mayor</option>
            </select>
            </div>
            <table className={css.tableDon}>
                <tbody>
           {
           
            allDonations?.map((e:any)=>{
                console.log(allDonations)
                return(
                    <tr className={css.trDon}>
                    <Donation
                    id={e._id}
                    username={e.username}
                    mail={e.mail}
                    amount={e.amount}/>
                    </tr>
                )
            })
           }
           </tbody>
            </table>
            <DonationChart />

        </div>
    )
};