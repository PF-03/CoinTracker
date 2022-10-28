const stateInicial:Object={
    actAll:[],
    newsAll:[],
}

export default function rootReducer(state=stateInicial,action:any){
    switch(action.type){
        case "GET_ACTIVS":

            return {
                ...state,
                actAll:action.payload
            }

            case "GET_NEWS":

                return {
                    ...state,
                    newsAll:action.payload
                }
        default:
            return state 

}
}