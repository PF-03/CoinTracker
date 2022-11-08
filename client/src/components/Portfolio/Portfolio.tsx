import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActivsHistoryValue,
  getWalletData,
  setCurrentAssetView,
  setHistoryDataActivo,
  setNameTransaccion,
} from "../../redux/actions";
import styles from "./Portfolio.module.css";
import AreaChart from "../Charts/AreaChart";
import Sidebar from "../Sidebar/Sidebar";
import AssetsList from "./AssetsList/AssetsList";
import Transaccion from "../transaccion/transaccion";
import { OpenClose } from "../transaccion/openClose";
const Portfolio = () => {
  const dispatch: any = useDispatch<any>();
  const [isOpen, open, close] = OpenClose();
  const user = useSelector((state: any) => state.user);

  const [state, setState] = React.useState({
    chartLoading:true,
  });
  React.useEffect(() => {
    async function getDataAndChart() {
      setState({...state,chartLoading:true})
      await dispatch(getWalletData(user._id ? user._id : user[0]._id));
      setState({...state,chartLoading:false})
    }
    getDataAndChart();
  }, [dispatch]);

  const ChartData = useSelector((state: any) => state.historyDataActivo);
  const curretPage = useSelector((state: any) => state.currentAssetView);
  const AllHistoryValueData = useSelector(
    (state: any) => state.historyCoinsDataValue
  );
  
  function copiarAlPortapapeles(name_elemento) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(name_elemento).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

  const HandleButtonClick = (e: any) => {
    e.preventDefault();
    dispatch(setCurrentAssetView(e.target.name));
  };
  const HandleMainChartClick = (e: any) => {
    dispatch(setHistoryDataActivo({ belongsWallet: true }));
  };
  const HandleTrClick = (id) => {
    var AssetById = AllHistoryValueData.filter((el) => el.coinId === id);
    if (AssetById.length === 0) {
      async function getAndRender() {
        setState({...state,chartLoading:true})
        await dispatch(
          getActivsHistoryValue({ coinId: id, vs_currency: "usd" })
        );
        setTimeout((e) => {
          dispatch(setHistoryDataActivo({ coinId: id, belongsWallet: false }));
          setState({...state,chartLoading:false})
        }, 1500);
      }
      getAndRender();
    } else {
      dispatch(setHistoryDataActivo({ coinId: id, belongsWallet: false }));
    }
    document.documentElement.scrollTop = 0;
  };
  let modalName: String;
  const modal = async (e) => {
    modalName = await e;
    await dispatch(setNameTransaccion(modalName));
    await open();
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.portfolioContainer}>
        <h5>Total en USD$</h5>
        <div className={styles.dataContainer}>
          <div className={styles.valueContainer} onClick={HandleMainChartClick}>
            <div className={styles.main_value_container}>
              <h2 id="main_value">$0,00</h2>
              <button onClick={()=>copiarAlPortapapeles("main_value")}></button>
            </div>
            <h5>Texto</h5>
            <h5 className={styles.redH5}>$0,00</h5>
            <h5>Texto</h5>
            <h5 className={styles.greenH5}>$0,00</h5>
          </div>
          <div className={styles.chartContainer}>
            {state.chartLoading?(
            <div className={styles.lds_ring}><div></div><div></div><div></div></div>):
            (
              <AreaChart
                data={{
                  labels: ChartData["labels"] ? ChartData["labels"] : [],
                  datasets: [
                    {
                      fill: true,
                      label: ChartData["coinId"],
                      data: ChartData["datasets"] ? ChartData["datasets"] : [],
                      borderColor:
                        ChartData["datasets"] === undefined ||
                        ChartData["datasets"][0] <
                          ChartData["datasets"].slice(-1)[0]
                          ? "#00CE6A"
                          : "#FA2020",
                      backgroundColor:
                        ChartData["datasets"] === undefined ||
                        ChartData["datasets"][0] <
                          ChartData["datasets"].slice(-1)[0]
                          ? "#00ce6a7b"
                          : "#c719197f",
                    },
                  ],
                }}
              ></AreaChart>
            )
          }
          
          </div>
        </div>
        <div className={styles.assetsContainer}>
          <div className={styles.assetsNavbarContainer}>
            <div>
              <button
                className={
                  curretPage == "allAssets"
                    ? styles.UnselectedButton
                    : styles.SelectedButton
                }
                onClick={(e) => HandleButtonClick(e)}
                name="myAssets"
              >
                My Assets
              </button>
              <button
                className={
                  curretPage == "myAssets"
                    ? styles.UnselectedButton
                    : styles.SelectedButton
                }
                onClick={(e) => HandleButtonClick(e)}
                name="allAssets"
              >
                All Assets
              </button>
            </div>
            <input type="text" />
          </div>
          <AssetsList HandleTrClick={HandleTrClick} modal={modal}></AssetsList>
        </div>
        <Transaccion isOpen={isOpen} close={close} />
      </div>
    </div>
  );
};
export default Portfolio;
