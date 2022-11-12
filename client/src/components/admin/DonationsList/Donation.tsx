import css from '../DonationsList/DonationsList.module.css';



const Donation =({id, username, mail, amount})=>{
    
  
  
    return(
        
       <div key={id}>
     
        
            <td className={css.tdDon}>
                {username}
            </td>
            <td className={css.tdDon}>
                {mail}
            </td>
            <td className={css.tdDon}>
                {amount}
            </td>
        
        
   
       </div>


     




    )
} 

export default Donation;