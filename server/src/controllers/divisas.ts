import axios from 'axios';
import cotizaciones from '../models/cotizaciones'

// set endpoint and your access key

const apikey = '47c283a15fb245428f7576fc9fdd053e';

// get the most recent exchange rates via the "latest" endpoint:
export const getDivisas= async() : Promise<any> =>{

   const date= new Date();
   const getDay = date.getDay();
   //console.log(getDay)
   const getCotizacion= await cotizaciones.find({})
   
   

   if(getCotizacion){
      const diaModel:any=getCotizacion[0].dia;
      if(diaModel!==getDay){

         const url=  await axios('https://exchange-rates.abstractapi.com/v1/live?api_key='+apikey+'&base=USD')
         const infoDivisas = url.data
         const str = JSON.stringify(infoDivisas);
         const coti = JSON.parse(str).exchange_rates

         await cotizaciones.updateOne(
            {dia:`${diaModel}`}
                ,
            {dia:`${getDay}`, datos:coti}
            
         )
         
      }

      return getCotizacion[0].datos;
   }

   const url=  await axios('https://exchange-rates.abstractapi.com/v1/live?api_key='+apikey+'&base=USD')
   const infoDivisas = url.data
   const str = JSON.stringify(infoDivisas);
   const coti = JSON.parse(str).exchange_rates
   return coti;
}


export const cambio= async ():Promise<any>=>{
   const peticion = await getDivisas();
   
   //console.log(exchange_rates);

   return peticion;
}