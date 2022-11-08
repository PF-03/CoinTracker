import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchAdmins } from "../../../redux/actions"


export default function SearchBarAdmins(){

    const dispatch=useDispatch<any>()
    const allAdmins = useSelector((state:any) => state.adminsCopy);
    

    function HandleInputChange(){
        const input = document.getElementById('busquedaAdm') as HTMLInputElement | null;
        //console.log(input.value)
        const inputSelect=  document.getElementById('selectAdmins') as HTMLInputElement | null;
        dispatch(searchAdmins(allAdmins,input.value, inputSelect.value))
        
    }
    


    return (
        <div>
            <input placeholder="Search admin..." id="busquedaAdm" onChange={HandleInputChange}></input>
            <button>Search</button>
            <select id='selectAdmins' onChange={HandleInputChange}>
                <option>All Admmins</option>
                <option>Active</option>
                <option>Blocked</option>
            </select>
        </div>
    )
}