import swapIcon from '../../assets/swap.png';
import downArrowIcon from '../../assets/down-arrow.png';
import style from './Swap.module.css';

export const Swap = ({
  actives,
  setCoinOneState,
  setCoinTwoState,
  coinOneState,
  coinTwoState,
  handleChange,
  coinCalcValues,
  changeCoin,
  handleSwap,
}) => {
  return (
    <div className={style['coins-container']}>
      <p>Swap tokens instantly. </p>
      {actives && actives[0] ? (
        <div
          onClick={() =>
            setCoinOneState({
              ...coinOneState,
              show: !coinOneState.show,
            })
          }
          className={style['token-title']}
        >
          <img
            src={coinOneState.data.image}
            alt={coinOneState.data.name}
            width='30px'
            height='30px'
          />
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

      {actives && actives[1] ? (
        <div
          onClick={() =>
            setCoinTwoState({
              ...coinTwoState,
              show: !coinTwoState.show,
            })
          }
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
      {(coinCalcValues.coinOne || coinCalcValues.coinTwo) && (
        <p>
          Price{' '}
          {(
            coinTwoState.data.current_price / coinOneState.data.current_price
          ).toFixed(3)}{' '}
          {coinOneState.data.symbol.toUpperCase()} per{' '}
          {coinTwoState.data.symbol.toUpperCase()}{' '}
        </p>
      )}
      <button onClick={handleSwap}>Swap</button>
    </div>
  );
};
