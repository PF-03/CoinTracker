import React from 'react';
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getNameActivos } from "../../redux/actions/index";



function SearchBar(){
    const dispatch = useDispatch<any>();  
    
    const[name, setName] = useState("");

    function HandleInputChange(e:any){
        e.preventDefault();
        setName(e.target.value)
        dispatch(getNameActivos(name)) //para que busque mientras escribe

    }

    function HandleSumbit(e:any){
        dispatch(getNameActivos(name) )
        console.log(getNameActivos(name))
    }
   



    return(
        <div>
       <input
       type="text"
       placeholder='search active...'
       onChange={(e:any)=> HandleInputChange(e)}
       
       />
       <button 
       type="submit"
       onClick={(e:any)=> HandleSumbit(e)}
       >
        Search
       </button>
       </div>
       

      
       
    )
}

export default SearchBar;