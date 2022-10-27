
const initialState= {
    activos : [],
    allactivos: []
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
        default:
            return state;
    }
}






export default rootReducer;