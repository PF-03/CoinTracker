import { getActivos } from "./getActivos"




export const filterActivos = async (filter:any): Promise<any> => {
    const activos = await getActivos();

    if(filter==='Price'){
        const orderByPrice = activos.sort(function(a:any,b:any){
            if(a.current_price>b.current_price){
                return -1;
            }
            if(b.current_price > a.current_price){
                return 1;
            }
            return 0;
        })
        return orderByPrice;
    }
    if(filter==='Market Capitalization'){
        const orderByMarket_cap = activos.sort(function(a:any,b:any){
            if(a.market_cap>b.market_cap){
                return -1;
            }
            if(b.market_cap > a.market_cap){
                return 1;
            }
            return 0;
        })
        return orderByMarket_cap;
    }
    return 'error'
    
    
}
 