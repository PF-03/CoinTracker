import style from "./PriceAlert.module.css";
import { useEffect, useState } from "react";
import { getActivos, handlePriceAlert } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getReminders, selectionPriceAlert } from "../../redux/actions";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "../styles/button";

export const PriceAlert = ({ setShowPriceAlert }) => {
  const dispatch = useDispatch<any>();
  const allActives: any = useSelector<any>((state) => state.activos);
  const reminders: any = useSelector<any>((state) => state.userReminders);
  const selectionPriceAlertOne: any = useSelector(
    (state: any) => state.coinPriceAlert
  );
  const showPriceAlert: any = useSelector(
    (state: any) => state.handlePriceAlert
  );
  const [selectedCoin, setSelectedCoin] = useState<any>({
    name: "",
    symbol: "",
    image: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [price, setPrice] = useState("");
  const user: any = useSelector<any>((state) => state.user);

  useEffect(() => {
    if (!allActives.length) {
      dispatch(getActivos());
    }

    const priceSelection = () => {
      if (selectionPriceAlertOne?.name) {
        setSelectedCoin({
          name: selectionPriceAlertOne.name,
          symbol: selectionPriceAlertOne.symbol,
          image: selectionPriceAlertOne.image,
        });
      }
      return;
    };
    priceSelection();
    dispatch(getReminders(user.username));
  }, [dispatch, getReminders, selectionPriceAlertOne]);

  const filteredActives = () => {
    if (searchValue) {
      return allActives.filter((active) =>
        active.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return allActives;
  };

  const handleClick = async () => {
    await dispatch(selectionPriceAlert({}));
    await dispatch(handlePriceAlert());
    setSearchValue("");
    setSelectedCoin({
      name: "",
      symbol: "",
      image: "",
    });
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const createAlert = () => {
    if (!selectedCoin.name) {
      return Swal.fire(
        "We need more info!",
        `You have to select the token you want to be notified.`,
        "info"
      );
    }
    if (!price) {
      return Swal.fire(
        "We need more info!",
        `You have to set a price.`,
        "info"
      );
    }

    axios.post("/reminder", {
      user: user.username,
      user_email: user.mail,
      token_price: `${selectedCoin.symbol} ${price}`,
    });
    setSelectedCoin({
      name: "",
      symbol: "",
      image: "",
    });
    setPrice("");
    Swal.fire(
      "Success",
      `You succesfuly create a price alert of ${selectedCoin.symbol} for when it gets to the price of ${price}`,
      "success"
    );
    dispatch(getReminders(user.username));
  };

  return (
    <>
      {showPriceAlert && (
        <div onClick={handleClick} className={style.overlay}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={style["modal-container"]}
          >
            <div className={style.header}>
              <h4>Price Alerts</h4>
              <button onClick={handleClick} className={style.close}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" />
                </svg>
              </button>
            </div>
            <h4>Create New Alert</h4>
            {selectedCoin.name && (
              <div className={style.selectedCoin}>
                <p>{selectedCoin.name}</p>
                <p>{selectedCoin.symbol.toUpperCase()}</p>
                <img
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                  width="30px"
                  height="30px"
                />
                <div
                  onClick={() =>
                    setSelectedCoin({
                      name: "",
                      symbol: "",
                      image: "",
                    })
                  }
                  className={style.unselect}
                >
                  X
                </div>
              </div>
            )}
            {!selectedCoin.name && (
              <input
                onChange={handleChange}
                type="text"
                placeholder="Select a coin"
                value={searchValue}
              />
            )}
            <input
              onChange={handlePrice}
              type="number"
              placeholder="Set Price"
              value={price}
            />
            <Button
              gradient
              onClick={createAlert}
              className={style["create-alert"]}
            >
              Create
            </Button>
            {searchValue && !!filteredActives().length && (
              <div className={style["coins-container"]}>
                {filteredActives().map((active) => {
                  return (
                    <div
                      onClick={() => {
                        setSearchValue("");
                        setSelectedCoin({
                          name: active.name,
                          symbol: active.symbol,
                          image: active.image,
                        });
                      }}
                      key={active.name}
                      className={style.coin}
                    >
                      <img
                        src={active.image}
                        alt={active.name}
                        width="30px"
                        height="30px"
                      />
                      <p>{active.name}</p>
                      <p>{active.symbol.toUpperCase()}</p>
                      <p>{active.current_price}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={style["alerts-container"]}>
              {reminders.map((item: any) => {
                const [token, price] = item.token_price?.split(" ");
                return (
                  <div className={style.alert} key={item._id}>
                    <p>{token.toUpperCase()}</p>
                    <img
                      src={allActives.find((a) => a.symbol === token).image}
                      alt=""
                      width="30px"
                      height="30px"
                    />
                    <p>{price}$</p>
                    <div className={style.unselect}>X</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
