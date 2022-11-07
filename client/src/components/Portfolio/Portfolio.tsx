import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {getActivsHistoryValue,getWalletData,setCurrentAssetView,setHistoryDataActivo} from '../../redux/actions';
import styles from "./Portfolio.module.css";
import AreaChart from "../Charts/AreaChart";
import Sidebar from "../Sidebar/Sidebar";
import AssetsList from "./AssetsList/AssetsList";
const Portfolio = () => {

  const dispatch = useDispatch<any>();
  const [state, setState] = React.useState({
    coinId:"",
    vs_currency:"",
    coinAmount:"",
  });
  React.useEffect(() => {
    async function getDataAndChart(){
      await dispatch(getWalletData("Camilo"))
    }
    getDataAndChart()
  }, [dispatch])
  
  const ChartData = useSelector((state:any) => state.historyDataActivo);
  const curretPage= useSelector((state:any)=>state.currentAssetView)
  const AllHistoryValueData= useSelector((state:any)=>state.historyCoinsDataValue)

  const HandleButtonClick=(e:any)=>{
    dispatch(setCurrentAssetView(e.target.name))
  }
  const HandleMainChartClick = (e:any)=>{
    dispatch(setHistoryDataActivo({belongsWallet:true}))
  }
  const HandleTrClick=(id)=>{
      var AssetById= AllHistoryValueData.filter(el=>el.coinId===id)
      if(AssetById.length===0){
        async function getAndRender(){
          await dispatch(getActivsHistoryValue({coinId:id,vs_currency:"usd"}))
          setTimeout((e)=>{dispatch(setHistoryDataActivo({coinId:id,belongsWallet:false}))}, 1500)
        }
        getAndRender();
      }else{
        dispatch(setHistoryDataActivo({coinId:id,belongsWallet:false}))
      }
      document.documentElement.scrollTop = 0;
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.portfolioContainer}>
        <h5>Total en USD$</h5>
        <div className={styles.dataContainer}>
          <div className={styles.valueContainer}
          onClick={HandleMainChartClick}
          >
            <h2>$0,00</h2>
            <h5>Texto</h5>
            <h5 className={styles.redH5}>$0,00</h5>
            <h5>Texto</h5>
            <h5 className={styles.greenH5}>$0,00</h5>
          </div>
          <div className={styles.chartContainer}>
            <AreaChart
              data={{ 
                labels: ChartData["labels"]?ChartData["labels"]:[],
                datasets: [
                  {
                    fill: true,
                    label: ChartData["coinId"],
                    data: ChartData["datasets"]?ChartData["datasets"]:[],
                    borderColor: (ChartData["datasets"]===undefined||ChartData["datasets"][0]<ChartData["datasets"].slice(-1)[0])?"#00CE6A":"#FA2020",
                    backgroundColor: (ChartData["datasets"]===undefined||ChartData["datasets"][0]<ChartData["datasets"].slice(-1)[0])?"#00ce6a7b":"#c719197f",
                  },
                ],
              }}
            ></AreaChart>
          </div>
        </div>
        <div className={styles.assetsContainer}>
          <div className={styles.assetsNavbarContainer}>
            <div>
                <button className={curretPage=="allAssets"?styles.UnselectedButton:styles.SelectedButton} onClick={(e)=>HandleButtonClick(e)} name="myAssets">My Assets</button>
                <button className={curretPage=="myAssets"?styles.UnselectedButton:styles.SelectedButton} onClick={(e)=>HandleButtonClick(e)} name="allAssets">All Assets</button>
            </div>
            <input type="text" />
          </div>
              <AssetsList HandleTrClick={HandleTrClick}></AssetsList>
        </div>
      </div>
    </div>
  );
};
export default Portfolio;
