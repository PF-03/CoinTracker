import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../../redux/actions"


export default function SearchBarUsers(){

    const dispatch=useDispatch<any>()
    const allUsers = useSelector((state:any) => state.users);

    function HandleInputChange(){
        const input = document.getElementById('busqueda') as HTMLInputElement | null;
        //console.log(allUsers)
        dispatch(searchUsers(allUsers,input.value))
    }
    


    return (
        <div>
            <input placeholder="Search user..." id="busqueda" onChange={HandleInputChange}></input>
            <button>Search</button>
        </div>
    )
}