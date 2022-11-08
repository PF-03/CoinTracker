import axios from "axios";
/* import { json } from 'body-parser'; */
import { latest } from "immer/dist/internal";

export function getActivos() {
  return async function (dispatch: any) {
    var json = await axios("http://localhost:3001/activos", {});
    return dispatch({
      type: "GET_ACTIVOS",
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
  return async function (dispatch: any) {
    try {
      var json = await axios(
        "http://localhost:3001/activos?name=" +
          name +
          "&minimo=" +
          minimo +
          "&maximo=" +
          maximo +
          "&divisas=" +
          divisa
      );
      //console.log(json.data);
      return dispatch({
        type: "GET_NAME_ACTIVOS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getCotizaciones() {
  return async function (dispatch: any) {
    try {
      var json = await axios("http://localhost:3001/activos/cotizaciones");
      return dispatch({
        type: "GET_COTIZACIONES",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getNews() {
  return function (dispatch) {
    fetch("http://localhost:3001/news")
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_NEWS",
          payload: res,
        });
      });
  };
}

export function getUserId(id) {
  return function (dispatch) {
    fetch("http://localhost:3001/users/" + id)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_USERID",
          payload: res,
        });
      });
  };
}

export function getDetailsActivos(id: any) {
  return {
    type: "GET_DETAILS_ACTIVOS",
    payload: id,
  };
}
export function getDetailsNews(id: string) {
  return {
    type: "GET_DETAILS_NEWS",
    payload: id,
  };
}
export function seeMore() {
  return {
    type: "GET_SEEMORE",
  };
}

export function setUserToken(token: any) {
  return {
    type: "SET_USER_TOKEN",
    payload: token,
  };
}

export function setUser(user: any) {
  return {
    type: "SET_USER",
    payload: user,
  };
}

export function postWallet(body) {
  return async function (dispatch) {
    const res = await axios.post("http://localhost:3001/wallet", body);
    return res;
  };
}

export function postMail(data: any) {
  return function (dispatch: any) {
    return fetch("http://localhost:3001/mail/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "POST_MAIL",
          payload: res,
        });
      });
  };
}

export function setExchangeHistory(history) {
  return {
    type: "SET_EXCHANGE_HISTORY",
    payload: history,
  };
}

export function getReminders(username: any) {
  return async (dispatch: any) => {
    return await axios
      .post("http://localhost:3001/reminder/getreminders", {
        user: username,
      })
      .then((res) => {
        dispatch({
          type: "GET_REMINDERS",
          payload: res.data,
        });
      });
  };
}

export function setNotificationNumbers(numberOfNotifications) {
  return {
    type: "SET_NOTIFICATIONS_NUMBER",
    payload: numberOfNotifications,
  };
}

export function getAdmins() {
  //Obtener los admins registrados
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/users/admins");
    return dispatch({
      type: "GET_ADMINS",
      payload: json.data,
    });
  };
}
export function searchUsers(allUsers,search, inputSelect){
  let users =allUsers;
  if (search){
    users= users.filter((e:any)=>e.mail.includes(search))
  }
  if(inputSelect == 'Active'){
    users= users.filter((e:any)=>e.activos===true)
  }
  if(inputSelect=='Bloqued'){
    users= users.filter((e:any)=>e.activos===false)
  }
  if(inputSelect==='All Users'){
    users = users;
  }
  console.log(users)
  return function(dispatch){
    return dispatch( {
      type: "SEARCH_USERS",
      payload: users
    })
  }
  
}

export function filterusers(usersCopy:any,input:any){
  let users;
  if(input == 'Active'){
    users= usersCopy.filter((e:any)=>e.activos===true)
  }
  if(input=='Bloqued'){
    users= usersCopy.filter((e:any)=>e.activos===false)
  }
  if(input==='All Users'){
    users = usersCopy;
  }
  
  //console.log(users)
  return function(dispatch){
    return dispatch({
      type: "FILTER_USERS",
      payload: users
    })
  }
  
}


export function getReviews() {
  //Obtener lo mensajes de feedback
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/review"); // http://localhost:3001/review
    return dispatch({
      type: "GET_REVIEWS",
      payload: json.data,
    });
  };
}

export function getUsers() {
  //Obtener todos los patients
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/users");
    return dispatch({
      type: "GET_USERS",
      payload: json.data,
    });
  };
}
export function getUserProfile(id) {
  //Obtener el detalle de un patient
  return async function (dispatch) {
    console.log(id);
    let json = await axios.get(`http://localhost:3001/users/${id}`);
    return dispatch({
      type: "GET_USER_PROFILE",
      payload: json.data,
    });
  };
}

export function putProfileAdmin(id, dato) {
  //Actualizar user
  dato = {
    ...dato,
  };
  return async function (dispatch) {
    let json = await axios.put(`http://localhost:3001/users/admin/` + id, dato);
    return dispatch({
      type: "PUT_USER_PROFILE_ADMIN",
      payload: json.data,
    });
  };
}

export function deleteUser(id) {
  //Borrar user
  return async function (dispatch) {
    const deleted = await axios.delete(`http://localhost:3001/users/${id}`);
    return dispatch({
      type: "DELETE_USER",
      payload: deleted,
    });
  };
}

export function getActivsHistoryValue(data: any) {
  return function (dispatch: any) {
    fetch(
      `http://localhost:3001/activos/historyValue` +
        `?coinId=${data.coinId ? data.coinId : "bitcoin"}` +
        `&vs_currency=${data.vs_currency ? data.vs_currency : "usd"}` +
        `${data.userId ? `userId=$${data.userId}` : ""}`
    )
      .then((data) => data.json())
      .then((res) => {
        dispatch({
          type: "GET_ACTIV_HISTORY_VALUE",
          payload: res,
        });
      });
  };
}
export function setHistoryDataActivo(data) {
  return {
    type: "SET_HISTORY_DATA_ACTIVO",
    payload: data,
  };
}
export function getWalletData(UserId) {
  return async function (dispatch: any) {
    await fetch(`http://localhost:3001/wallet/${UserId}?showDeleted=false`)
      .then((data) => data.json())
      .then((data) => {
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
      .then(async (data) => {
        var historyData = [];
        const newArray = data.map(async (element, index) => {
          const data = await fetch(
            `http://localhost:3001/activos/historyValue?coinId=${element.crypto}&userId=${UserId}&vs_currency=usd`
          );
          const parsedData = await data.json();
          historyData.push(parsedData);
        });
        await Promise.all(newArray);
        var MaxDay = { max: 0, index: 0 };
        historyData.forEach((el, index) => {
          if (el.days > MaxDay.max) {
            MaxDay.index = index;
            MaxDay.max = el.days;
          }
        });
        var mainData = {
          coinId: "All / USD",
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
          mainData.labels.unshift(historyData[MaxDay.index].labels[i]);
          /* console.log(i,"sum: ",sum) */
          mainData.datasets.push(sum);
        }
        return [data, mainData];
      })
      .then((res) => {
        dispatch({
          type: "GET_WALLET_DATA",
          payload: res,
        });
      });
  };
}
export function setMainChartData() {
  return {
    type: "SET_MAIN_CHART_DATA",
    payload: "",
  };
}
export function setCurrentAssetView(name) {
  return {
    type: "SET_CURRENT_ASSET_VIEW",
    payload: name,
  };
}
export function setMyAssets(data) {
  return {
    type: "SET_MY_ASSETS",
    payload: data,
  };
}
