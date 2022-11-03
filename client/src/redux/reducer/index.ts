const initialState = {
  activos: [],
  allactivos: [],
  newsAll: [],
  allNews: [],
  detailsActivos: {},
  historyDataActivo:{},
  detailsNews: {},
  seeMore: false,
  user: {},
  userToken: '',
  myAssets:[],
  currentAssetView:"myAssets",
};

function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_USER_TOKEN':
      return {
        ...state,
        userToken: action.payload,
      };
    case 'GET_ACTIVOS':
      return {
        ...state,
        activos: action.payload,
        allactivos: action.payload,
      };
    case 'GET_NAME_ACTIVOS':
      return {
        ...state,
        activos: action.payload,
      };

    case 'POST_MAIL':
      return {
        ...state,
      };
    case 'GET_DETAILS_ACTIVOS': {
      let filter = state.allactivos.filter(
        (el: any) => el.id.toString() === action.payload
      );

      return {
        ...state,
        detailsActivos: filter[0],
      };
    }
    case 'GET_NEWS': {
      const news: any = action.payload[0].new;
      return {
        ...state,
        newsAll: news,
      };
    }
    case 'GET_DETAILS_NEWS': {
      let filterNews = state.allNews.filter(
        (el: any) => el.id === action.payload
      );
      return {
        ...state,
        detailsNews: filterNews,
      };
    }
    case 'GET_SEEMORE': {
      return {
        ...state,
        seeMore: !state.seeMore,
      };
    }
    case "GET_ACTIV_HISTORY_VALUE":{
      return {
        ...state,
        historyDataActivo: action.payload,
      }
    }
    case "SET_CURRENT_ASSET_VIEW":{
      return {
        ...state,
        currentAssetView:action.payload,
      }
    }
    case "SET_MY_ASSETS":{
      return {
        ...state,
        myAssets:[...state.myAssets,action.payload]
      }
    }
    default:
      return state;
  }
}

export default rootReducer;
