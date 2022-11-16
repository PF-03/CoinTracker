import React from 'react'
import st from './Chart.module.css'
import { getUsers } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import AreaChart from '../../Charts/AreaChart';

export default function Chart() {
    const dispatch: any = useDispatch<any>();

    dispatch(getUsers)

    React.useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, getUsers])

    const allUsers = useSelector((state: any) => state.users);
    const dataChart = () => {
        let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
        let dataSets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        allUsers.forEach((element) => {
            let month = element.createdAt.split('-')[1]
            console.log(month, element.name)
            dataSets[month - 1]++
        });
        console.log(dataSets)
        return [labels, dataSets];
    }
    const data = dataChart();
    return (
        <div className={st.chart}>

            <h3 className={st.chartTitle}>USER ANALYTICS</h3>
            <AreaChart
                data={{
                    labels: data[0] ? data[0] : [],
                    datasets: [
                        {
                            fill: false,
                            label: 'Users',
                            data: data[1] ? data[1] : [],
                            borderColor: 'violet',
                            backgroundColor: 'black'
                        },
                    ],
                }}
            ></AreaChart>
        </div >
    )
}
