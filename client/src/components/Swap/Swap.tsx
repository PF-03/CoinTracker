import swapIcon from '../../assets/swap.png';
import downArrowIcon from '../../assets/down-arrow.png';
import style from './Swap.module.css';
import Button from '../styles/button';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../rutas/rutas';
import { useEffect, useState } from 'react';

export const Swap = ({
  processing,
  userWallet,
  setCoinOneState,
  setCoinTwoState,
  coinOneState,
  coinTwoState,
  handleChange,
  coinCalcValues,
  changeCoin,
  handleSwap,
}) => {
  const navigate = useNavigate();
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    if (userWallet.dataLoaded) {
      return setIsContentLoaded(true);
    }
  }, [userWallet]);

  return (
    <div className={style['coins-container']}>
      {!isContentLoaded ? (
        <>
          <div className={style.lds_ring}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : userWallet && userWallet[0] ? (
        processing ? (
          <div className={style.lds_ring}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <p>Swap tokens instantly. </p>
            {userWallet && userWallet[0] ? (
              <div
                onClick={() => {
                  setCoinOneState({
                    ...coinOneState,
                    show: !coinOneState.show,
                  });
                }}
                className={style['token-title']}
              >
                {userWallet && userWallet[0] && (
                  <img
                    src={coinOneState.data.image}
                    alt={coinOneState.data.name}
                    width='30px'
                    height='30px'
                  />
                )}
                <h3>
                  {coinOneState.data.symbol
                    ? coinOneState.data.symbol.toUpperCase()
                    : coinOneState.data.symbol}
                </h3>
                <img
                  src={downArrowIcon}
                  alt='down arrow icon'
                  width='15px'
                  height='15px'
                />
                {coinOneState.data.user ? (
                  <div className={style['user-data']}>
                    <p>{coinOneState.data.user}</p>
                    <p>Owned: {coinOneState.data.quantity.toFixed(5)}</p>
                  </div>
                ) : null}
              </div>
            ) : (
              'loading'
            )}

            <input
              onChange={handleChange}
              name='coinOne'
              type='number'
              placeholder='0.0'
              value={coinCalcValues.coinOne.toString()}
            />

            <img
              onClick={changeCoin}
              src={swapIcon}
              alt='swap icon'
              className={style.invert}
            />

            {userWallet && userWallet[0] ? (
              <div
                onClick={() => {
                  setCoinTwoState({
                    ...coinTwoState,
                    show: !coinTwoState.show,
                  });
                }}
                className={style['token-title']}
              >
                <img
                  src={coinTwoState.data.image}
                  alt={coinTwoState.data.name}
                  width='30px'
                  height='30px'
                />
                <h3>
                  {coinTwoState.data.symbol
                    ? coinTwoState.data.symbol.toUpperCase()
                    : coinTwoState.data.symbol}
                </h3>
                <img
                  src={downArrowIcon}
                  alt='down arrow icon'
                  width='15px'
                  height='15px'
                />
                {coinTwoState.data.user ? (
                  <div className={style['user-data']}>
                    <p>{coinTwoState.data.user}</p>
                    <p>Owned:{coinTwoState.data.quantity.toFixed(3)}</p>
                  </div>
                ) : null}
              </div>
            ) : (
              'loading'
            )}

            <input
              onChange={handleChange}
              name='coinTwo'
              type='number'
              placeholder='0.0'
              value={coinCalcValues.coinTwo.toString()}
            />
            {(coinCalcValues.coinOne > 0 || coinCalcValues.coinTwo > 0) && (
              <p>
                Price{' '}
                {(
                  coinTwoState.data.current_price /
                  coinOneState.data.current_price
                ).toFixed(7)}{' '}
                {coinOneState.data.symbol.toUpperCase()} per{' '}
                {coinTwoState.data.symbol.toUpperCase()}{' '}
              </p>
            )}
            <button
              disabled={
                coinOneState.data.rank === coinTwoState.data.rank ? true : false
              }
              onClick={handleSwap}
            >
              Swap
            </button>
          </>
        )
      ) : (
        <div className={style['no-coin-message']}>
          <p>
            It seem's that you don't have any coin in your wallet. To use the
            swap tool, first you need to make a transaction.
          </p>
          <Button gradient onClick={() => navigate(PrivateRoutes.PORTFOLIO)}>
            Go To Portfolio
          </Button>
        </div>
      )}
    </div>
  );
};
