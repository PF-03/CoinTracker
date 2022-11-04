//LS (Local Storage)
import * as LS from "../../utils/LocalStorageData";

const initialState = {
  activos: [],
  allactivos: [],
  newsAll: [],
  allNews: [],
  detailsActivos: {},
  detailsNews: {},
  seeMore: false,
  cotizaciones:[],


  user: localStorage.getItem(LS.UserKey)
    ? JSON.parse(localStorage.getItem(LS.UserKey) as string)
    : {},
  userID: {},
  userToken: localStorage.getItem(LS.TokenKey)
    ? JSON.parse(localStorage.getItem(LS.TokenKey) as string)
    : "",

};

function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_USER":
      LS.persistLocalStore(LS.UserKey, action.payload);
      return {
        ...state,
        user: { ...action.payload },
      };
    case "SET_USER_TOKEN":
      LS.persistLocalStore(LS.TokenKey, action.payload);
      return {
        ...state,
        userToken: action.payload,
      };

    case "GET_USERID":
      return {
        ...state,
        userID: action.payload,
      };
    case "GET_ACTIVOS":
      return {
        ...state,
        activos: action.payload,
        allactivos: action.payload,
      };
    case "GET_NAME_ACTIVOS":
      return {
        ...state,
        activos: action.payload,
      };

    case "POST_MAIL":
      return {
        ...state,
      };
    case "GET_DETAILS_ACTIVOS": {
      let filter = state.allactivos.filter(
        (el: any) => el.id.toString() === action.payload
      );

      return {
        ...state,
        detailsActivos: filter[0],
      };
    }
    case "GET_NEWS": {
      const news: any = action.payload[0].new;
      return {
        ...state,
        newsAll: news,
      };
    }
    case "GET_DETAILS_NEWS": {
      let filterNews = state.allNews.filter(
        (el: any) => el.id === action.payload
      );
      return {
        ...state,
        detailsNews: filterNews,
      };
    }
    case "GET_SEEMORE": {
      return {
        ...state,
        seeMore: !state.seeMore,
      };
    }

    case 'GET_COTIZACIONES':
      return{
        ...state,
        cotizaciones:action.payload
      }

    case "RESET": {
      localStorage.clear();
      state = initialState;
      return state;
    }
    default:
      return state;
  }
}

export default rootReducer;
