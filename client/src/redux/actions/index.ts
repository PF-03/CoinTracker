import axios from 'axios';
/* import { json } from 'body-parser'; */
// import { latest } from 'immer/dist/internal';

export function getActivos() {
  return async function(dispatch: any) {
    var json = await axios('/activos', {});
    return dispatch({
      type: 'GET_ACTIVOS',
      payload: json.data,
    });
  };
}

export function getNameActivos(
  name: any,
  minimo: any,
  maximo: any,
  divisa: any
) {
  return async function(dispatch: any) {
    try {
      console.log(name, 'soy name');
      var json = await axios(
        '/activos?name=' +
          name +
          '&minimo=' +
          minimo +
          '&maximo=' +
          maximo +
          '&divisas=' +
          divisa
      );
      //console.log(json.data);
      return dispatch({
        type: 'GET_NAME_ACTIVOS',
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getCotizaciones() {
  return async function(dispatch: any) {
    try {
      var json = await axios('/activos/cotizaciones');
      return dispatch({
        type: 'GET_COTIZACIONES',
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getNews() {
  return function(dispatch) {
    fetch(`${import.meta.env.VITE_SERVER_API}/news`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: 'GET_NEWS',
          payload: res,
        });
      });
  };
}

export function getUserId(id) {
  return function(dispatch) {
    fetch(`${import.meta.env.VITE_SERVER_API}/users/${id}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: 'GET_USERID',
          payload: res,
        });
      });
  };
}

export function getDetailsActivos(id: any) {
  return {
    type: 'GET_DETAILS_ACTIVOS',
    payload: id,
  };
}
export function getDetailsNews(id: string) {
  return {
    type: 'GET_DETAILS_NEWS',
    payload: id,
  };
}
export function seeMore() {
  return {
    type: 'GET_SEEMORE',
  };
}

export function setUserToken(token: any) {
  return {
    type: 'SET_USER_TOKEN',
    payload: token,
  };
}

export function setUser(user: any) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}

export function postWallet(body) {
  return async function(dispatch) {
    const res = await axios.post('/wallet', body);

    return res;
  };
}
export function putWallet(body, id) {
  return async function(dispatch) {
    const res = await axios.put('/wallet/' + id, body);
    return res;
  };
}

export function postMail(data: any) {
  return function(dispatch: any) {
    return fetch(`${import.meta.env.VITE_SERVER_API}/mail/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: 'POST_MAIL',
          payload: res,
        });
      });
  };
}

export function setExchangeHistory(history) {
  return {
    type: 'SET_EXCHANGE_HISTORY',
    payload: history,
  };
}

export function getReminders(username: any) {
  return async (dispatch: any) => {
    return await axios
      .post('/reminder/getreminders', {
        user: username,
      })
      .then((res) => {
        dispatch({
          type: 'GET_REMINDERS',
          payload: res.data,
        });
      });
  };
}

export function setNotificationNumbers(numberOfNotifications) {
  return {
    type: 'SET_NOTIFICATIONS_NUMBER',
    payload: numberOfNotifications,
  };
}

export function getAdmins() {
  //Obtener los admins registrados
  return async function(dispatch) {
    let json = await axios.get('/users/admins');
    return dispatch({
      type: 'GET_ADMINS',
      payload: json.data,
    });
  };
}
export function searchUsers(allUsers, search, inputSelect) {
  let users = allUsers;
  if (search) {
    users = users.filter((e: any) => e.mail.includes(search));
  }
  if (inputSelect == 'Active') {
    users = users.filter((e: any) => e.activos === true);
  }
  if (inputSelect == 'Blocked') {
    users = users.filter((e: any) => e.activos === false);
  }
  if (inputSelect === 'All Users') {
    users = users;
  }

  return function(dispatch) {
    return dispatch({
      type: 'SEARCH_USERS',
      payload: users,
    });
  };
}
export function searchAdmins(allAdmins, search, inputSelect) {
  let admins = allAdmins;
  if (search) {
    admins = admins.filter((e: any) => e.name.includes(search));
  }
  if (inputSelect == 'Active') {
    admins = admins.filter((e: any) => e.activos === true);
  }
  if (inputSelect == 'Blocked') {
    admins = admins.filter((e: any) => e.activos === false);
  }
  if (inputSelect === 'All Users') {
    admins = admins;
  }
  console.log(admins);
  return function(dispatch) {
    return dispatch({
      type: 'SEARCH_ADMINS',
      payload: admins,
    });
  };
}

export function orderDonations(input, allDonations) {
  let donations = allDonations;
  if (input === 'Untidy') {
    donations = allDonations.sort(function() {
      return Math.random() - 0.5;
    });
  }
  if (input === 'Descendant') {
    donations.sort(function(a, b) {
      if (a.amount < b.amount) {
        return 1;
      }
      if (b.amount < a.amount) {
        return -1;
      }
      return 0;
    });
  }

  if (input === 'Ascendant') {
    donations.sort(function(a, b) {
      if (a.amount < b.amount) {
        return -1;
      }
      if (b.amount < a.amount) {
        return 1;
      }
      return 0;
    });
  }
  return async function(dispatch) {
    return dispatch({
      type: 'ORDER_DONATIONS',

      payload: donations,
    });
  };
}

export function getDonations() {
  return async function(dispatch) {
    let json = await axios.get('/donate');

    return dispatch({
      type: 'GET_DONATIONS',
      payload: json.data,
    });
  };
}

export function getReviews() {
  //Obtener lo mensajes de feedback
  return async function(dispatch) {
    let json = await axios.get('/review'); // /review
    return dispatch({
      type: 'GET_REVIEWS',
      payload: json.data,
    });
  };
}

export function getUsers() {
  //Obtener todos los patients
  return async function(dispatch) {
    let json = await axios.get('/users');
    return dispatch({
      type: 'GET_USERS',
      payload: json.data,
    });
  };
}
export function getUserProfile(id) {
  //Obtener el detalle de un patient
  return async function(dispatch) {
    console.log(id);
    let json = await axios.get(`/users/${id}`);
    return dispatch({
      type: 'GET_USER_PROFILE',
      payload: json.data,
    });
  };
}

export function putProfileAdmin(id, dato) {
  //Actualizar user
  dato = {
    ...dato,
  };
  return async function(dispatch) {
    let json = await axios.put(`/users/admin/` + id, dato);
    return dispatch({
      type: 'PUT_USER_PROFILE_ADMIN',
      payload: json.data,
    });
  };
}

export function deleteUser(id) {
  //Borrar user
  return async function(dispatch) {
    const deleted = await axios.delete(`/users/${id}`);
    return dispatch({
      type: 'DELETE_USER',
      payload: deleted,
    });
  };
}

export function getActivsHistoryValue(data: any) {
  return function(dispatch: any) {
    fetch(
      `${import.meta.env.VITE_SERVER_API}/activos/historyValue` +
        `?coinId=${data.coinId ? data.coinId : 'bitcoin'}` +
        `&vs_currency=${data.vs_currency ? data.vs_currency : 'usd'}` +
        `${data.userId ? `userId=$${data.userId}` : ''}`
    )
      .then((data) => data.json())
      .then((res) => {
        dispatch({
          type: 'GET_ACTIV_HISTORY_VALUE',
          payload: res,
        });
      });
  };
}
export function setHistoryDataActivo(data) {
  return {
    type: 'SET_HISTORY_DATA_ACTIVO',
    payload: data,
  };
}

export function getWalletData(UserId) {
  return async function(dispatch: any) {
    await fetch(
      `${import.meta.env.VITE_SERVER_API}/wallet/${UserId}?showDeleted=false`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data, 'soy data actios');
        return data.map((el) => {
          return {
            _id: el._id,
            crypto: el.crypto,
            name: el.crypto,
            id: el.crypto,
            quantity: el.quantity,
            rank: el._id,
          };
        });
      })
      .then((res) => {
        console.log(res, 'soy actions');
        dispatch({
          type: 'GET_WALLET_DATA',
          payload: res,
        });
      });
  };
}
export function getMainChartData(UserId, walletData) {
  return async function(dispatch: any) {
    var historyData = [];

    var portfolioData = {
      current_USD_Amound: 0,
      lastValue: 0,
    };
    const newArray = walletData.map(async (element, index) => {
      const data = await fetch(
        `${import.meta.env.VITE_SERVER_API}/activos/historyValue?coinId=${
          element.crypto
        }&userId=${UserId}&vs_currency=usd`
      );
      const parsedData = await data.json();
      historyData.push(parsedData);
    });
    await Promise.all(newArray)
      .then(async (data: any) => {
        var MaxDay = { max: 0, index: 0 };
        historyData.forEach((el, index) => {
          if (el.days > MaxDay.max) {
            MaxDay.index = index;
            MaxDay.max = el.days;
          }
        });
        var mainData = {
          coinId: 'All / USD',
          labels: [],
          datasets: [],
          days: MaxDay.max,
        };
        for (let i = MaxDay.max - 1; i >= 0; i--) {
          var sum = 0;
          historyData.forEach((el) => {
            var dataset = el.datasets.reverse();
            /* console.log(i,el.coinId,dataset,dataset[i]) */
            sum = sum + (dataset[i] === undefined ? 0 : dataset[i]);
            el.datasets.reverse();
          });
          if (i === MaxDay.max - 1) {
            mainData.labels.unshift(historyData[MaxDay.index].labels[i - 1]);
          } else {
            mainData.labels.unshift(historyData[MaxDay.index].labels[i]);
          }
          /* console.log(i,"sum: ",sum) */
          mainData.datasets.push(sum);
          if (i === 1) {
            portfolioData.lastValue = sum;
          }
          if (i === 0) {
            portfolioData.current_USD_Amound = sum;
          }
        }
        console.log('main data: ', mainData);
        return [mainData, portfolioData];
      })
      .then((res) => {
        console.log(res, 'soy actions');
        dispatch({
          type: 'GET_MAIN_CHART_DATA',
          payload: res,
        });
      });
  };
}

export function setCurrentAssetView(name) {
  return {
    type: 'SET_CURRENT_ASSET_VIEW',
    payload: name,
  };
}
export function setMyAssets(data) {
  return {
    type: 'SET_MY_ASSETS',
    payload: data,
  };
}
export function setNameTransaccion(data: String) {
  return {
    type: 'SET_N_TRANSACCION',
    payload: data,
  };
}
export function getUserWallet(id) {
  return async (dispatch) => {
    const data = await axios
      .get(`${import.meta.env.VITE_SERVER_API}/wallet/${id}?showDeleted=false`)
      .then((res) => res.data);

    const actives = await axios
      .get(`${import.meta.env.VITE_SERVER_API}/activos`)
      .then((res) => res.data);

    const walletData = data.map((item) => {
      if (item.quantity) {
        return {
          ...actives.find((active) => {
            return (
              active.id.toLowerCase() === item.crypto ||
              active.name.toLowerCase() === item.crypto
            );
          }),
          quantity: item.quantity,
          walletId: item._id,
          history: item.history,
          allActives: data,
        };
      }
    });

    for (let i = 0; i < walletData.length; i++) {
      if (!walletData[i]) {
        walletData.splice(i, 1);
      }
    }
    walletData.dataLoaded = true;

    console.log(walletData);

    return dispatch({
      type: 'GET_USER_WALLET',
      payload: walletData,
    });
  };
}

export function alfabetico(data) {
  return {
    type: 'ALFABETICO',
    payload: data,
  };
}

export function favoritos(data) {
  return {
    type: 'FAVORITOS_WALLET',
    payload: data,
  };
}
