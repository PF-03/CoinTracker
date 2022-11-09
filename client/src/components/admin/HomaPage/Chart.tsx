import st from './Chart.module.css'
import AreaChart from '../../Charts/AreaChart'
import { useSelector,useDispatch } from 'react-redux';

export default function Chart({ title, data, dataKey, grid }) {

    const dispatch = useDispatch<any>();
    const ChartData = useSelector((state: any) => state.users);

    return (

        <div className={st.chart}>

            <h3 className={st.chartTitle}>{title}</h3>
            <AreaChart
                data={{
                    labels: ChartData["labels"] ? ChartData["labels"] : [],
                    datasets: [
                        {
                            fill: true,
                            label: ChartData["coinId"],
                            data: ChartData["datasets"] ? ChartData["datasets"] : [],
                            borderColor: (ChartData["datasets"] === undefined || ChartData["datasets"][0] < ChartData["datasets"].slice(-1)[0]) ? "#00CE6A" : "#FA2020",
                            backgroundColor: (ChartData["datasets"] === undefined || ChartData["datasets"][0] < ChartData["datasets"].slice(-1)[0]) ? "#00ce6a7b" : "#c719197f",
                        },
                    ],
                }}
            ></AreaChart>
        </div>
    )
}
