
const initialState= {
    activos : [],
    allactivos: [],
    newsAll:[]
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

            case "GET_NEWS":

                return {
                    ...state,
                    newsAll:action.payload
                }

        default:
            return state;
    }
}




export default rootReducer;

