import axios from 'axios';


export const getActivos = async (): Promise<string | undefined> => {
        try{
 
        const url = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        //console.log(url)
        const infoActivos = await url.data;
        //console.log(JSON.stringify(infoActivos))
        
        return infoActivos;

        }catch(e){return 'error'}

  
}