import axios from 'axios';



export const getActivos = async (): Promise<any> => {
        try{
 
        const url = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        //console.log(url)
        
        //console.log(JSON.stringify(infoActivos))
        //const activos = JSON.parse(infoActivos)
        const infoActivos = await url.data.map((e:any) =>{
                return {
                        id: e.id,
                        symbol: e.symbol,
                        name: e.name,
                        image: e.image,
                        current_price: e.current_price,
                        market_cap: e.market_cap,
                        high_24h: e.high_24h,
                        low_24h: e.low_24h
                   }
                   
            })


        return infoActivos;

        }catch(e){return 'error'}

  
}