export function getActivos(){
    return function(dispatch:any){
        return fetch("http://localhost:3001/activos")
        .then(res=>res.json())
        .then(res=>{
        
            dispatch({
                type:"GET_ACTIVS",
                payload:res
            })})}

}
export function getNews(){
    return function(dispatch:any){
        return fetch("http://localhost:3001/news")
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:"GET_NEWS",
                payload:res[0].new
            })})}

}