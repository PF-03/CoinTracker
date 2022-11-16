import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchAdmins } from "../../../redux/actions"
import css from '../../admin/SearchAdmins/searchAdmins.module.css';


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
        <div className={css.containerSearchAdmins}>
            <input placeholder="Search admin by name..." id="busquedaAdm" onChange={HandleInputChange} className={css.searchBarAdmins}></input>
            <button className={css.searchButtonAdmins}>Search</button >
            <select id='selectAdmins' onChange={HandleInputChange} className={css.selectAdmins}>
                <option>All Admins</option>
                <option>Active</option>
                <option>Blocked</option>
            </select>
        </div>
    )
}