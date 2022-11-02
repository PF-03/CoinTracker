import React from "react";
import styles from "./Portfolio.module.css";
import AreaChart from "../Charts/AreaChart";
import Sidebar from "../Sidebar/Sidebar";
const Portfolio = () => {
  return (
    <div className={styles.mainContainer}>
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className={styles.portfolioContainer}>
        <h5>Total en USD$</h5>
        <div className={styles.dataContainer}>
          <div className={styles.valueContainer}>
            <h2>$0,00</h2>
            <h5>Texto</h5>
            <h5 className={styles.redH5}>$0,00</h5>
            <h5>Texto</h5>
            <h5 className={styles.greenH5}>$0,00</h5>
          </div>
          <div className={styles.chartContainer}>
            <AreaChart
              data={{
                labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
                datasets: [
                  {
                    fill: true,
                    label: "Name",
                    data: [1, 2, 4, 6, 3, 1, 7, 0],
                    borderColor: "#00CE6A",
                    backgroundColor: "#00ce6a7b",
                  },
                ],
              }}
            ></AreaChart>
          </div>
        </div>
        <div className={styles.assetsContainer}>
            
        </div>
      </div>
    </div>
  );
};
export default Portfolio;
