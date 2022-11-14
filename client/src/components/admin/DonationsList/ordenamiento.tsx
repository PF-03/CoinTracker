import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { orderDonations} from "../../../redux/actions";

export default function OrderDonations() {

    const dispatch = useDispatch<any>()
    const allDonations = useSelector((state: any) => state.donations);

    function Handle() {
        const input = document.getElementById('selectDonations') as HTMLInputElement | null;
        dispatch(orderDonations(input.value, allDonations));
        // this.forceUpdate();
        console.log(allDonations)
    }

    return (
        <div >
            <select id='selectDonations' onChange={Handle}>
                <option>Normal</option>
                <option>Mayor a Menor</option>
                <option>Menor a Mayor</option>
            </select>
        </div>
    )
} 