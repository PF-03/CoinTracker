import Bubble from "../styles/bubbles";
import axios from "axios";
import style from "./SwapComponent.module.css";
import { SwapModal } from "../swapModal/SwapModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swap } from "../Swap/Swap";
import { History } from "../History/History";
import Sidebar from "../Sidebar/Sidebar";
import swapIcon from "../../assets/swap.png";
import downArrowIcon from "../../assets/down-arrow.png";

export default function SwapComponent() {
  const { name } = useSelector((state: any) => state.user);
  const actives: any = useSelector<any>((state) => state.activos);
  console.log(actives);
  const [coinOneState, setCoinOneState] = useState<any>({
    show: false,
    data: {},
  });
  const [coinTwoState, setCoinTwoState] = useState<any>({
    show: false,
    data: {},
  });
  const [coinCalcValues, setCoinCalcValues] = useState<any>({
    coinOne: "",
    coinTwo: "",
  });
  const [changeView, setChangeView] = useState<any>(true);

  const changeCoin = () => {
    setCoinOneState({ ...coinOneState, data: { ...coinTwoState.data } });
    setCoinTwoState({ ...coinTwoState, data: { ...coinOneState.data } });
    setCoinCalcValues({
      coinOne: coinCalcValues.coinTwo,
      coinTwo: coinCalcValues.coinOne,
    });
  };

  const handleChange = (e) => {
    const coinOneVsCoinTwo =
      coinOneState.data.current_price / coinTwoState.data.current_price;
    const coinTwoVsCoinOne =
      coinTwoState.data.current_price / coinOneState.data.current_price;
    setCoinCalcValues(() => {
      if (e.target.name === "coinOne") {
        const coinOneValue = e.target.value;
        const coinTwoValue = e.target.value * coinOneVsCoinTwo;
        return {
          coinOne: coinOneValue,
          coinTwo:
            coinTwoValue.toString().length > 7
              ? (coinTwoValue - 1 + 1).toFixed(7)
              : coinTwoValue,
        };
      }
      const coinTwoValue = e.target.value;
      const coinOneValue = e.target.value * coinTwoVsCoinOne;
      return {
        coinOne:
          coinOneValue.toString().length > 7
            ? (coinOneValue - 1 + 1).toFixed(7)
            : coinOneValue,
        coinTwo: coinTwoValue,
      };
    });
  };

  const handleSwap = () => {
    axios.post("http://localhost:3001/exchange", {
      icon1: coinOneState.data.image,
      icon2: coinTwoState.data.image,
      crypto1: coinOneState.data.symbol,
      crypto2: coinTwoState.data.symbol,
      quantity1: coinCalcValues.coinOne,
      quantity2: coinCalcValues.coinTwo,
      price1: coinOneState.data.current_price,
      price2: coinTwoState.data.current_price,
      date: new Date().toLocaleString(),
      username: name || "default",
    });
  };

  useEffect(() => {
    if (actives && actives[0] && !Object.keys(coinOneState.data).length) {
      setCoinOneState({ ...coinOneState, data: actives[0] });
    }
    if (actives && actives[1] && !Object.keys(coinTwoState.data).length) {
      setCoinTwoState({ ...coinTwoState, data: actives[1] });
    }
    if (coinCalcValues.coinOne === 0) {
      return setCoinCalcValues({ ...coinCalcValues, coinOne: "" });
    }
    if (coinCalcValues.coinTwo === 0) {
      return setCoinCalcValues({ ...coinCalcValues, coinTwo: "" });
    }

    setCoinCalcValues(coinCalcValues);
  }, [actives, coinCalcValues]);

  return (
    <div className={style.view}>
      <div>
        <SwapModal
          modalState={coinOneState}
          setModalState={setCoinOneState}
          coin="Coin 1"
        />
        <SwapModal
          modalState={coinTwoState}
          setModalState={setCoinTwoState}
          coin="Coin 2"
        />
      </div>

      <div className={style.swap}>
        <div className={style["swap-container"]}>
          <div className={style["container-headers"]}>
            <div
              onClick={() => setChangeView(!changeView)}
              className={!changeView ? style["head1-active"] : style.head1}
            >
              <h1>Swap</h1>
            </div>
            <div
              onClick={() => setChangeView(!changeView)}
              className={changeView ? style["head2-active"] : style.head2}
            >
              <h1>History</h1>
            </div>
          </div>

          {changeView && (
            <div>
              <Swap
                actives={actives}
                setCoinOneState={setCoinOneState}
                setCoinTwoState={setCoinTwoState}
                coinOneState={coinOneState}
                coinTwoState={coinTwoState}
                handleChange={handleChange}
                coinCalcValues={coinCalcValues}
                changeCoin={changeCoin}
                handleSwap={handleSwap}
              />

              <div className={style["coins-container"]}>
                <p>Swap tokens instantly. </p>
                {actives && actives[0] ? (
                  <div
                    onClick={() =>
                      setCoinOneState({
                        ...coinOneState,
                        show: !coinOneState.show,
                      })
                    }
                    className={style["token-title"]}
                  >
                    <img
                      src={coinOneState.data.image}
                      alt={coinOneState.data.name}
                      width="30px"
                      height="30px"
                    />
                    <h3>
                      {coinOneState.data.symbol
                        ? coinOneState.data.symbol.toUpperCase()
                        : coinOneState.data.symbol}
                    </h3>
                    <img
                      src={downArrowIcon}
                      alt="down arrow icon"
                      width="15px"
                      height="15px"
                    />
                  </div>
                ) : (
                  "loading"
                )}

                <input
                  onChange={handleChange}
                  name="coinOne"
                  type="number"
                  placeholder="0.0"
                  value={coinCalcValues.coinOne.toString()}
                />

                <img
                  onClick={changeCoin}
                  src={swapIcon}
                  alt="swap icon"
                  className={style.invert}
                />

                {actives && actives[1] ? (
                  <div
                    onClick={() =>
                      setCoinTwoState({
                        ...coinTwoState,
                        show: !coinTwoState.show,
                      })
                    }
                    className={style["token-title"]}
                  >
                    <img
                      src={coinTwoState.data.image}
                      alt={coinTwoState.data.name}
                      width="30px"
                      height="30px"
                    />
                    <h3>
                      {coinTwoState.data.symbol
                        ? coinTwoState.data.symbol.toUpperCase()
                        : coinTwoState.data.symbol}
                    </h3>
                    <img
                      src={downArrowIcon}
                      alt="down arrow icon"
                      width="15px"
                      height="15px"
                    />
                  </div>
                ) : (
                  "loading"
                )}

                <input
                  onChange={handleChange}
                  name="coinTwo"
                  type="number"
                  placeholder="0.0"
                  value={coinCalcValues.coinTwo.toString()}
                />
                {(coinCalcValues.coinOne || coinCalcValues.coinTwo) && (
                  <p>
                    Price{" "}
                    {(
                      coinTwoState.data.current_price /
                      coinOneState.data.current_price
                    ).toFixed(3)}{" "}
                    {coinOneState.data.symbol.toUpperCase()} per{" "}
                    {coinTwoState.data.symbol.toUpperCase()}{" "}
                  </p>
                )}
                <button>Swap</button>
              </div>
            </div>
          )}

          {!changeView && <History />}
        </div>
      </div>

      <SwapModal
        modalState={coinOneState}
        setModalState={setCoinOneState}
        coin="Coin 1"
      />
      <SwapModal
        modalState={coinTwoState}
        setModalState={setCoinTwoState}
        coin="Coin 2"
      />
    </div>
  );
}
