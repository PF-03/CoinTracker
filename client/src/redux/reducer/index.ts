
const initialState= {
    activos : [],
    allActivos: [],
    newsAll:[],
}


function rootReducer (state = initialState , action:any){
    switch(action.type){
        case 'GET_ACTIVOS':
            return{
                ...state,
                activos:action.payload,
                allActivos: action.payload
            }
        case 'GET_NAME_ACTIVOS':
            return{
                ...state,
                activos: action.payload

            }

             case "GET_NEWS":

                return {
                    ...state,
                    newsAll:action.payload
                }
        case "POST_MAIL":
            return{
                ...state
            }
        default:
            return state;
    }
}






export default rootReducer;

