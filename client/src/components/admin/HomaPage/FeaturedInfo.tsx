import st from './featuredInfo.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDonations } from "../../../redux/actions/index";

export default function featuredInfo() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getDonations());
  }, [dispatch, getDonations])

  const date = new Date();
  const actualYear = date.getFullYear();
  const actualMonth = date.getMonth() + 1;
  let totalDonation = 0;
  let totalUsers = 0;
  let dataMonthsDonations = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let dataMonthsUsers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let maxDonation = 0;
  let maxDonator = 0;
  let maxDonationDate = new Date();

  console.log(actualYear)
  console.log(actualMonth)
  const allDonations = useSelector((state: any) => state.donations);
  const allUsers = useSelector((state: any) => state.users);

  allDonations.forEach((element) => {
    let month = element.date.split('-')[1]
    totalDonation = totalDonation + element.amount
    if (element.amount > maxDonation) {
      maxDonation = element.amount
      maxDonator = element.username
      maxDonationDate = element.date
    }
    // console.log(totalDonation)
    dataMonthsDonations[month - 1] = totalDonation - dataMonthsDonations[month - 2]
  });

  let currentDate = new Date(maxDonationDate);

  allUsers.forEach((element) => {
    let month = element.createdAt.split('-')[1]
    totalUsers = totalUsers + 1
    dataMonthsUsers[month - 1]++
  });

  return (
    <div className={st.featured}>

      <div className={st.featuredItem}>
        <span className={st.featuredTitle}> Actual Month Donations </span>
        <div className={st.featuredMoneyCont}>
          <span className={st.featuredMoney}> USD {dataMonthsDonations[actualMonth - 1]} </span>
        </div>
        <span className={st.featuredSub}>Actual month</span>
      </div>

      <div className={st.featuredItem}>
        <span className={st.featuredTitle}> Total donations </span>
        <div className={st.featuredMoneyCont}>
          <span className={st.featuredMoney}> USD {totalDonation} </span>
        </div>
        <span className={st.featuredSub}>Actual year</span>
      </div>

      <div className={st.featuredItem}>
        <span className={st.featuredTitle}> Month registered users </span>
        <div className={st.featuredMoneyCont}>
          <span className={st.featuredMoney}> {dataMonthsUsers[actualMonth - 1]} users</span>
        </div>
        <span className={st.featuredSub}>Actual month</span>
      </div>

      <div className={st.featuredItem}>
        <span className={st.featuredTitle}> Year total registered users </span>
        <div className={st.featuredMoneyCont}>
          <span className={st.featuredMoney}> {totalUsers} users</span>
        </div>
        <span className={st.featuredSub}>Actual year</span>
      </div>

      <div className={st.featuredItem}>
        <span className={st.featuredTitle}> Top Donator </span>
        <div className={st.featuredMoneyCont}>
          <span className={st.featuredMoney}> {maxDonator} {maxDonation} USD </span>
        </div>
        <span className={st.featuredSub}>{currentDate.toDateString()}</span>
      </div>

    </div>
  )
}
