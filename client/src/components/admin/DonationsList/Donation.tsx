import css from '../DonationsList/DonationsList.module.css';



const Donation =({id, username, mail, amount})=>{
    
  
  
    return(
        
       <div key={id}>
     
        <div >
            <div className={css.tdDon} >
                <span >
                    <td >
                    {username}
                    </td>
                    <td >
                    {mail}
                    </td>
                    <td >
                    {amount}
                    </td>
                </span>
            </div>
        </div>
        
   
       </div>


     




    )
} 

export default Donation;