import style from './PriceAlert.module.css';
import { useEffect, useState } from 'react';
import { getActivos } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getReminders } from '../../redux/actions';
import axios from 'axios';

export const PriceAlert = ({ showPriceAlert, setShowPriceAlert }) => {
  const dispatch = useDispatch<any>();
  const allActives: any = useSelector<any>((state) => state.activos);
  const reminders: any = useSelector<any>((state) => state.userReminders);
  const [selectedCoin, setSelectedCoin] = useState<any>({
    name: '',
    symbol: '',
    image: '',
  });
  const [searchValue, setSearchValue] = useState('');
  const [price, setPrice] = useState('');
  const user: any = useSelector<any>((state) => state.user);

  useEffect(() => {
    if (!allActives.length) {
      dispatch(getActivos());
    }
    dispatch(getReminders(user.username));
  }, [dispatch, getReminders]);

  const filteredActives = () => {
    if (searchValue) {
      return allActives.filter((active) =>
        active.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return allActives;
  };

  const handleClick = () => {
    setShowPriceAlert(!showPriceAlert);
    setSearchValue('');
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const createAlert = () => {
    if (selectedCoin.name && price) {
      axios.post('http://localhost:3001/reminder', {
        user: user.username,
        user_email: user.mail,
        token_price: `${selectedCoin.symbol} ${price}`,
      });
      setSelectedCoin({
        name: '',
        symbol: '',
        image: '',
      });
      setPrice('');
      dispatch(getReminders(user.username));
    } else {
      alert('You have to select a coin');
    }
  };

  return (
    <>
      {showPriceAlert && (
        <div onClick={handleClick} className={style.overlay}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={style['modal-container']}
          >
            <div className={style.header}>
              <h4>Price Alerts</h4>
              <button onClick={handleClick} className={style.close}>
                X
              </button>
            </div>
            <h4>Create New Alert</h4>
            {selectedCoin.name && (
              <div className={style.selectedCoin}>
                <p>{selectedCoin.name}</p>
                <p>{selectedCoin.symbol}</p>
                <img
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                  width='30px'
                  height='30px'
                />
                <div
                  onClick={() =>
                    setSelectedCoin({
                      name: '',
                      symbol: '',
                      image: '',
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
                type='text'
                placeholder='Select a coin'
                value={searchValue}
              />
            )}
            <input
              onChange={handlePrice}
              type='number'
              placeholder='Set Price'
              value={price}
            />
            <button onClick={createAlert} className={style['create-alert']}>
              Create
            </button>
            {searchValue && !!filteredActives().length && (
              <div className={style['coins-container']}>
                {filteredActives().map((active) => {
                  return (
                    <div
                      onClick={() => {
                        setSearchValue('');
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
                        width='30px'
                        height='30px'
                      />
                      <p>{active.name}</p>
                      <p>{active.symbol.toUpperCase()}</p>
                      <p>{active.current_price}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={style['alerts-container']}>
              {reminders.map((item: any) => {
                const [token, price] = item.token_price?.split(' ');
                return (
                  <div className={style.alert} key={item._id}>
                    <p>{token.toUpperCase()}</p>
                    <img
                      src={allActives.find((a) => a.symbol === token).image}
                      alt=''
                      width='30px'
                      height='30px'
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
