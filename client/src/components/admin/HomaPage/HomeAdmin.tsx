import st from './HomeAdmin.module.css';
import FeaturedInfo from './FeaturedInfo';
import Chart from './Chart';
import DonationChart from '../DonationsList/DonationChart/DonationChart';
import SmallWidget from './Widgets/SmallWidget';
import LargeWidget from './Widgets/LargeWidget';
import { userData } from '../../../DummyData';
import AdminCarousel from './AdminCarousel';
export default function HomeAdmin() {
  return (

    <div className={st.HomeAdmin}>
      <AdminCarousel />
      {/* <FeaturedInfo /> */}
      <Chart />
      <DonationChart />

    </div>
  )
}
