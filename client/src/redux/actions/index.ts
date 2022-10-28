import { Action } from '@remix-run/router';
import { useDispatch } from "react-redux";
import axios from 'axios';



export function getActivos(){
    return async function(dispatch:any){
        var json = await axios ('http://localhost:3001/activos',{});
        return dispatch({
            type: 'GET_ACTIVOS',
            payload: json.data
        })
    }
}

export function getNameActivos(name:any){
    
    return async function(dispatch:any){
        try{
            var json = await axios('http://localhost:3001/activos?name='+name);
            console.log(json.data)
            return dispatch({
                
                type: 'GET_NAME_ACTIVOS',
                payload: json.data
            })
        }catch(e){
            console.log(e)
        }
    }
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



