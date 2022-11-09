import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchUsers } from "../../../redux/actions"


export default function SearchBarUsers(){

    const dispatch=useDispatch<any>()
    const allUsers = useSelector((state:any) => state.users);
    

    function HandleInputChange(){
        const input = document.getElementById('busqueda') as HTMLInputElement | null;
        //console.log(allUsers)
        const inputSelect=  document.getElementById('selectUsers') as HTMLInputElement | null;
        dispatch(searchUsers(allUsers,input.value, inputSelect.value))
        
    }
    


    return (
        <div>
            <input placeholder="Search user..." id="busqueda" onChange={HandleInputChange}></input>
            <button>Search</button>
            <select id='selectUsers' onChange={HandleInputChange}>
                <option>All Users</option>
                <option>Active</option>
                <option>Blocked</option>
            </select>
        </div>
    )
}