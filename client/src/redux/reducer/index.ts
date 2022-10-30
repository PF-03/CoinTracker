const initialState= {
    activos : [],
    allactivos: [],
    newsAll:[],
    allNews:[],
    detailsActivos:{},
    detailsNews:{},
    seeMore:false,
}


function rootReducer (state = initialState , action:any){
    switch(action.type){
        case 'GET_ACTIVOS':
           
            return{
                ...state,
                activos:action.payload,
                allactivos: action.payload
            }
        case 'GET_NAME_ACTIVOS':
            return{
                ...state,
                activos: action.payload

            }

        case "POST_MAIL":
            return{
                ...state
            }
        case "GET_DETAILS_ACTIVOS":{
            
            let filter=state.allactivos.filter((el:any)=>el.id.toString()===action.payload)
       
            return {
                ...state,
                detailsActivos:filter[0]
            }
        }
        case "GET_NEWS":{
            const news:any=action.payload[0].new
            return {
                ...state,
                newsAll:news
            }
        }
        case "GET_DETAILS_NEWS":{
            let filterNews=state.allNews.filter((el:any)=>el.id===action.payload)
            return {
                ...state,
                detailsNews:filterNews
            }
        }
        case "GET_SEEMORE":{
            return{
                ...state,
                seeMore:!state.seeMore
            }
        }
        default:
            return state;
    }
}






export default rootReducer;