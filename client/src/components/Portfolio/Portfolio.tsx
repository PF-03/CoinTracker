import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActivsHistoryValue,
  getWalletData,
  setCurrentAssetView,
  setHistoryDataActivo,
  setNameTransaccion,
  getNameActivos,
  getMainChartData,
} from "../../redux/actions";
import styles from "./Portfolio.module.css";
import AreaChart from "../Charts/AreaChart";
import AssetsList from "./AssetsList/AssetsList";
import Transaccion from "../transaccion/transaccion";
import { OpenClose } from "../transaccion/openClose";
import numberFormat from "../../utils/numberFormat";
import {store} from "../../redux/store/store"
const Portfolio = () => {
  const dispatch: any = useDispatch<any>();
  const [isOpen, open, close] = OpenClose();
  const user = useSelector((state: any) => state.user);

  const [state, setState] = React.useState({
    chartLoading: true,
  });
  React.useEffect(() => {
    async function getDataAndChart() {
      setState({ ...state, chartLoading: true });
      await dispatch(getWalletData(user._id ? user._id : user[0]._id));
      await dispatch(getMainChartData(user._id ? user._id : user[0]._id,store.getState().walletData))
      setState({ ...state, chartLoading: false });
    }
    getDataAndChart();
  }, [dispatch]);
  var UpPorcent = {
    amount:"0.00",
    percentage:"0.0"
  };
  var DownPorcent ={
    amount:"0.00",
    percentage:"0.0"
  }
  const ChartData = useSelector((state: any) => state.historyDataActivo);
  const curretPage = useSelector((state: any) => state.currentAssetView);
  const PortfolioData = useSelector((state: any) => state.portfolioData);
  const AllHistoryValueData = useSelector(
    (state: any) => state.historyCoinsDataValue
  );

  const percentage = () => {
    var amount_val =(PortfolioData.current_USD_Amound - PortfolioData.lastValue);
    var percentage_value = (amount_val /PortfolioData.lastValue) *100;
    if (amount_val <= 0) {
      UpPorcent.percentage = ""+numberFormat(-1*percentage_value,"compact").split("$")[1] ;
      UpPorcent.amount = ""+numberFormat(-1*amount_val,"compact") ;
      DownPorcent.amount = "0.00";
      DownPorcent.percentage = "0.0";
    } else {
      UpPorcent.percentage = "0.0";
      UpPorcent.amount = "0.00";
      DownPorcent.amount = ""+numberFormat(amount_val,'standard').split("$")[1].split("$")[1];
      DownPorcent.percentage = ""+numberFormat(percentage_value,"compact").split("$")[1];
    }
  };
  percentage();

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
        setState({ ...state, chartLoading: true });
        await dispatch(
          getActivsHistoryValue({ coinId: id, vs_currency: "usd" })
        );
        setTimeout((e) => {
          dispatch(setHistoryDataActivo({ coinId: id, belongsWallet: false }));
          setState({ ...state, chartLoading: false });
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
  const handleOnChange = async (e) => {
    e.preventDefault();
    dispatch(getNameActivos(e.target.value, "", "", ""));
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.portfolioContainer}>
        <h5>Total en USD$</h5>
        <div className={styles.dataContainer}>
          <div className={styles.valueContainer} onClick={HandleMainChartClick}>
            <div className={styles.main_value_container}>

              <h2 id="main_value">{numberFormat(PortfolioData.current_USD_Amound,"compact")}</h2>
              <button
                onClick={() => copiarAlPortapapeles("main_value")}
              ></button>
            </div>
            <h5>Texto</h5>
            <h5 className={styles.redH5}>{"" + UpPorcent.amount}</h5>
            <h6 className={styles.redH5}>{"" + UpPorcent.percentage}%</h6>
            <h5>Texto</h5>
            <h5 className={styles.greenH5}>${"" + DownPorcent.amount}</h5>
            <h6 className={styles.greenH5}>{"" + DownPorcent.percentage}%</h6>
          </div>
          <div className={styles.chartContainer}>
            {state.chartLoading ? (
              <div className={styles.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
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
            )}
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
            <input type="text" onChange={(e) => handleOnChange(e)} />
          </div>
          <AssetsList HandleTrClick={HandleTrClick} modal={modal}></AssetsList>
        </div>
        <Transaccion isOpen={isOpen} close={close} />
      </div>
    </div>
  );
};
export default Portfolio;
