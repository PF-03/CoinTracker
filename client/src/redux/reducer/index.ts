const initialState= {
    activos : [],
    allactivos: [],
    allNews:[],
    detailsActivos:{},
    detailsNews:{}
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
            console.log(filter)
            return {
                ...state,
                detailsActivos:filter[0]
            }
        }
        case "GET_DETAILS_NEWS":{
            let filterNews=state.allNews.filter((el:any)=>el.id===action.payload)
            return {
                ...state,
                detailsNews:filterNews
            }
        }
        default:
            return state;
    }
}






export default rootReducer;