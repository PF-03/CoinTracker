import Bubble from '../styles/bubbles';
import axios from 'axios';
import style from './SwapComponent.module.css';
import Swal from 'sweetalert2';
import { SwapModal } from '../swapModal/SwapModal';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swap } from '../Swap/Swap';
import { History } from '../History/History';
import { getUserWallet, putWallet, postWallet } from '../../redux/actions';

export default function SwapComponent() {
  const [isSwapped, setIsSwapped] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch<any>();
  const { name, _id } = useSelector((state: any) => state.user);
  const actives: any = useSelector<any>((state) => state.activos);
  const walletData: any = useSelector<any>((state) => state.userWallet);

  const [coinOneState, setCoinOneState] = useState<any>({
    show: false,
    data: {},
  });
  const [coinTwoState, setCoinTwoState] = useState<any>({
    show: false,
    data: {},
  });
  const [coinCalcValues, setCoinCalcValues] = useState<any>({
    coinOne: '',
    coinTwo: '',
  });

  const [changeView, setChangeView] = useState<any>(true);

  useEffect(() => {
    dispatch(getUserWallet(_id));
  }, [dispatch, getUserWallet, reducerValue]);

  useEffect(() => {
    if (walletData && walletData[0]) {
      setCoinOneState({
        ...coinOneState,
        data: { ...walletData[0], user: name },
      });
    }
    if (walletData && walletData[0]) {
      setCoinTwoState({ ...coinTwoState, data: actives[10] });
    }
  }, [walletData, reducerValue]);

  useEffect(() => {
    if (coinCalcValues.coinOne === 0) {
      return setCoinCalcValues({ ...coinCalcValues, coinOne: '' });
    }
    if (coinCalcValues.coinTwo === 0) {
      return setCoinCalcValues({ ...coinCalcValues, coinTwo: '' });
    }

    setCoinCalcValues(coinCalcValues);
  }, [coinCalcValues, reducerValue]);

  const changeCoin = () => {
    setIsSwapped(!isSwapped);
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
      if (e.target.name === 'coinOne') {
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
    if (!coinCalcValues.coinOne || !coinCalcValues.coinTwo)
      return Swal.fire(
        'We need more info!',
        `You have to give us the quantity you wan't to swap.`,
        'info'
      );
    if (
      isSwapped
        ? coinTwoState.data.quantity < coinCalcValues.coinTwo
        : coinOneState.data.quantity < coinCalcValues.coinOne
    ) {
      return Swal.fire(
        `You're Broke!`,
        `Just joking! You don't have enough ${(isSwapped
          ? coinTwoState.data.symbol
          : coinOneState.data.symbol
        ).toUpperCase()}, :(`,
        'warning'
      );
    }

    const existentCriptoWallet = walletData[0].allActives.filter(
      (active) =>
        active.crypto ===
        (isSwapped
          ? coinOneState.data.name
          : coinTwoState.data.name
        ).toLowerCase()
    );

    axios.post(
      `${import.meta.env.VITE_SERVER_API}/exchange`,
      isSwapped
        ? {
            icon1: coinTwoState.data.image,
            icon2: coinOneState.data.image,
            crypto1: coinTwoState.data.symbol,
            crypto2: coinOneState.data.symbol,
            quantity1: coinCalcValues.coinTwo,
            quantity2: coinCalcValues.coinOne,
            price1: coinTwoState.data.current_price,
            price2: coinOneState.data.current_price,
            date: new Date().toLocaleString(),
            username: name,
          }
        : {
            icon1: coinOneState.data.image,
            icon2: coinTwoState.data.image,
            crypto1: coinOneState.data.symbol,
            crypto2: coinTwoState.data.symbol,
            quantity1: coinCalcValues.coinOne,
            quantity2: coinCalcValues.coinTwo,
            price1: coinOneState.data.current_price,
            price2: coinTwoState.data.current_price,
            date: new Date().toLocaleString(),
            username: name,
          }
    );

    dispatch(
      isSwapped
        ? putWallet(
            {
              crypto: coinTwoState.data.name.toLowerCase(),
              user: _id,
              quantity:
                parseFloat(coinTwoState.data.quantity) -
                parseFloat(coinCalcValues.coinTwo),
            },
            coinTwoState.data.walletId
          )
        : putWallet(
            {
              crypto: coinOneState.data.name.toLowerCase(),
              user: _id,
              quantity:
                parseFloat(coinOneState.data.quantity) -
                parseFloat(coinCalcValues.coinOne),
            },
            coinOneState.data.walletId
          )
    );

    if (existentCriptoWallet.length) {
      dispatch(
        putWallet(
          {
            crypto: existentCriptoWallet[0].crypto,
            user: _id,
            quantity:
              parseFloat(
                isSwapped ? coinCalcValues.coinOne : coinCalcValues.coinTwo
              ) + parseFloat(existentCriptoWallet[0].quantity),
          },
          existentCriptoWallet[0]._id
        )
      );

      dispatch(getUserWallet(_id));
      forceUpdate();
      setProcessing(true);
      setCoinCalcValues({ coinOne: '', coinTwo: '' });
      return setTimeout(() => {
        setProcessing(false);
        isSwapped
          ? Swal.fire(
              'Success',
              `You succesfuly swap ${
                coinCalcValues.coinTwo
              } ${coinTwoState.data.symbol.toUpperCase()} for ${
                coinCalcValues.coinOne
              } ${coinOneState.data.symbol.toUpperCase()}`,
              'success'
            )
          : Swal.fire(
              'Success',
              `You succesfuly swap ${
                coinCalcValues.coinOne
              } ${coinOneState.data.symbol.toUpperCase()} for ${
                coinCalcValues.coinTwo
              } ${coinTwoState.data.symbol.toUpperCase()}`,
              'success'
            );
      }, 5000);
    }

    dispatch(
      isSwapped
        ? postWallet({
            crypto: coinOneState.data.name.toLowerCase(),
            quantity: parseFloat(coinCalcValues.coinOne),
            user: _id,
          })
        : postWallet({
            crypto: coinTwoState.data.name.toLowerCase(),
            quantity: parseFloat(coinCalcValues.coinTwo),
            user: _id,
          })
    );
    dispatch(getUserWallet(_id));
    forceUpdate();
    setProcessing(true);
    setCoinCalcValues({ coinOne: '', coinTwo: '' });
    setTimeout(() => {
      setProcessing(false);
      Swal.fire(
        'Success',
        `You succesfuly swap ${
          coinCalcValues.coinOne
        } ${coinOneState.data.symbol.toUpperCase()} for ${
          coinCalcValues.coinTwo
        } ${coinTwoState.data.symbol.toUpperCase()}`,
        'success'
      );
    }, 5000);
  };

  return (
    <div className={style.view}>
      <div>
        <SwapModal
          modalState={coinOneState}
          setModalState={setCoinOneState}
          coin='Coin 1'
        />
        <SwapModal
          modalState={coinTwoState}
          setModalState={setCoinTwoState}
          coin='Coin 2'
        />
      </div>
      <div className={style.swap}>
        <div className={style['swap-container']}>
          <div className={style['container-headers']}>
            <div
              onClick={() => setChangeView(!changeView)}
              className={!changeView ? style['head1-active'] : style.head1}
            >
              <h1>Swap</h1>
            </div>
            <div
              onClick={() => setChangeView(!changeView)}
              className={changeView ? style['head2-active'] : style.head2}
            >
              <h1>History</h1>
            </div>
          </div>

          {changeView && (
            <Swap
              processing={processing}
              userWallet={walletData}
              setCoinOneState={setCoinOneState}
              setCoinTwoState={setCoinTwoState}
              coinOneState={coinOneState}
              coinTwoState={coinTwoState}
              handleChange={handleChange}
              coinCalcValues={coinCalcValues}
              changeCoin={changeCoin}
              handleSwap={handleSwap}
            />
          )}

          {!changeView && (
            <History setChangeView={setChangeView} changeView={changeView} />
          )}
        </div>
      </div>
    </div>
  );
}
