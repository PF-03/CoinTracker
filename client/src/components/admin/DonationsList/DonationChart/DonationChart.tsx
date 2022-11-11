import React from 'react'
import st from './DonationChart.module.css'
import { getDonations } from '../../../../redux/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import AreaChart from '../../../Charts/AreaChart'

export default function DonationChart() {
    const dispatch: any = useDispatch<any>();

    dispatch(getDonations)

    React.useEffect(() => {
        dispatch(getDonations());
    }, [dispatch, getDonations])

    const allDonations = useSelector((state: any) => state.donations);
    const dataChart = () => {
        let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let dataSets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let totalDonation = 0;

        allDonations.forEach((element) => {
            let month = element.date.split('-')[1]
            totalDonation = totalDonation + element.amount
            console.log(totalDonation)
            dataSets[month - 1] = totalDonation
        });
        console.log(dataSets)
        return [labels, dataSets];
    }
    const data = dataChart();
    return (
        <div className={st.chart}>

            <h3 className={st.chartTitle}>DONATIONS ANALYTICS</h3>
            <AreaChart
                data={{
                    labels: data[0] ? data[0] : [],
                    datasets: [
                        {
                            fill: false,
                            label: 'Donations',
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