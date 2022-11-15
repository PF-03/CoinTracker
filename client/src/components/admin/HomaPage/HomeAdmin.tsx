import st from './HomeAdmin.module.css';
import Chart from './Chart';
import DonationChart from '../DonationsList/DonationChart/DonationChart';
import AdminCards from './AdminCards';
export default function HomeAdmin() {
  return (

    <div className={st.HomeAdmin}>
      <AdminCards />
      <Chart />
      <DonationChart />

    </div>
  )
}
