import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchUsers } from "../../../redux/actions"
import css from '../SearchUsers/searchUsers.module.css';



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
        <div className={css.containerSearchUsers}>
            <input placeholder="Search user..." id="busqueda" onChange={HandleInputChange} className={css.searchBarUsers}></input>
            <button className={css.searchButtonUsers}>Search</button>
            <select id='selectUsers' onChange={HandleInputChange} className={css.selectUsers}>
         
                <option>All Users</option>
                <option>Active</option>
                <option>Blocked</option>

            </select>
        </div>
    )
}