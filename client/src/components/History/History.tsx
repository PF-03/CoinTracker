import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setExchangeHistory } from '../../redux/actions';
import style from './History.module.css';
import axios from 'axios';
import Button from '../styles/button';

export const History = ({ setChangeView, changeView }) => {
  const { mail } = useSelector((state: any) => state.user);
  const exchangeHistory = useSelector(
    (state: any) => state.userExchangeHistory
  );
  const dispatch = useDispatch();

  const formatDate = (date) => {
    const formatedDate = date.split('T');
    return (
      <>
        <p>{formatedDate[0]}</p>
        <p>{formatedDate[1].replace('.000Z', '')}</p>
      </>
    );
  };
  useEffect(() => {
    axios
      .post('/exchange/getExchange', {
        username: mail,
      })
      .then((res) => dispatch(setExchangeHistory(res.data)));
  }, []);

  return (
    <div className={style['history-container']}>
      <div className={style.history}>
        {exchangeHistory && exchangeHistory.length ? (
          exchangeHistory.map((item) => {
            return (
              <div key={item._id} className={style['history-item']}>
                <div className={style['coin-info']}>
                  <div className={style['coin-info-asset']}>
                    <img
                      src={item.icon1}
                      alt={item.crypto1}
                      width='20px'
                      height='20px'
                    />
                    <p>{item.crypto1.toUpperCase()}</p>
                  </div>
                  <div className={style['coin-info-asset']}>
                    <img
                      src={item.icon2}
                      alt={item.crypto2}
                      width='20px'
                      height='20px'
                    />
                    <p>{item.crypto2.toUpperCase()}</p>
                  </div>
                </div>

                <div className={style['coin-quantities']}>
                  <p>{item.quantity1}</p>
                  <p>{item.quantity2}</p>
                </div>

                <div className={style['coin-prices']}>
                  <p>{item.price1} $</p>
                  <p>{item.price2} $</p>
                </div>
                <div className={style['exchange-date']}>
                  {formatDate(item.date)}
                </div>
              </div>
            );
          })
        ) : (
          <div className={style['no-transactions-message']}>
            <p>
              It seem's that you don't have any transactions in your swap
              history.
            </p>
            <Button gradient onClick={() => setChangeView(!changeView)}>
              Go Back to Swap
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
