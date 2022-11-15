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
    
    

    useEffect(() => {
        dispatch(getDonations());
        
    }, [dispatch])
    
    
    
    
   
    function Handle() {
        const input = document.getElementById('selectDonations') as HTMLInputElement | null;
        dispatch(orderDonations(input.value, allDonations));
        // this.forceUpdate();
        //console.log(allDonations)
    }


    return (
        <div className={st.userList}>
            <div >
                <span>
                    <select id='selectDonations' onChange={Handle} className={css.selectDon}>
                        <option>Untidy</option>
                        <option>Descendant</option>
                        <option>Ascendant</option>
                    </select>
            </span>
            </div>
            <div className={css.containerDon}>
            <table className={css.tableDon}>
                <tbody>
            <tr>
                <div>
                    <td className={css.tdDon}>Username</td>
                    <td className={css.tdDon}>Mail</td>
                    <td className={css.tdDon}>Amount</td>
                </div>
            </tr>
           {
           
            allDonations?.map((e:any)=>{
                console.log(allDonations)
                return(
                    <tr >
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
            </div>
            <DonationChart />

        </div>
    )
};