import axios from 'axios';
import activos from "../models/activos"

export const getActivos = async (): Promise<any> => {
    const date=new Date()
    const horas=date.toLocaleTimeString()
   
    const getAct=await activos.find({})
    const horaSplit=horas.split(":")
   
   
if(getAct){
    const horaModel:any=getAct[0].hora
    const horaSplitModel=horaModel.split(":")
    console.log(horaSplitModel[1])
    if(horaModel || parseInt(horaSplitModel[1])<parseInt(horaSplit[1]) ){
        if(parseInt(horaSplitModel[0])<=parseInt(horaSplit[0])
           && parseInt(horaSplitModel[1])<parseInt(horaSplit[1]) && parseInt(horaSplitModel[1])>=0 && parseInt(horaSplitModel[1])<56 ){
            const cincoMin=parseInt(horaSplitModel[1])+5;
            await activos.updateOne(
                {hora:`${horaSplitModel[0]}:${horaSplitModel[1]}`}
                ,
                {hora:`${horaSplitModel[0]}:${cincoMin}`})
        }
        else if(parseInt(horaSplitModel[1])>55){
        const hora=parseInt(horaSplitModel[0])+1
        await activos.updateOne(
            {hora:`${horaSplitModel[0]}:${horaSplitModel[1]}`}
            ,
            {hora:`${hora}:00`})
    }
    const datos=await activos.find({})
    return datos[0].activos
        }
        
else if(!horaModel){
    try {
        let rank:number=1;
        const url = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        //console.log(url)
        //console.log(JSON.stringify(infoActivos))
        //const activos = JSON.parse(infoActivos)
        const infoActivos = await url.data.map((e: any) => {
            return {
                rank:rank++,
                id: e.id,
                symbol: e.symbol,
                name: e.name,
                image: e.image,
                current_price: parseInt(e.current_price),
                market_cap: e.market_cap,
                high_24h: e.high_24h,
                low_24h: e.low_24h,
                total_volume:e.total_volume,
                total_supply:e.total_supply,
                max_supply:e.max_supply,
                circulating_supply:e.circulating_supply
            }
        })
        
        const create={
            hora:`${horaSplit[0]}:${horaSplit[1]}`,
            activos:infoActivos
        }
       const creacion:any= await activos.create(create)
       return creacion[0].activos

       
    } catch (e) { return 'error' } 


}
}

    let rank:number=1;
    const url = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    //console.log(url)
    //console.log(JSON.stringify(infoActivos))
    //const activos = JSON.parse(infoActivos)
    const infoActivos = await url.data.map((e: any) => {
        return {
            rank:rank++,
            id: e.id,
            symbol: e.symbol,
            name: e.name,
            image: e.image,
            current_price: e.current_price,
            market_cap: e.market_cap,
            high_24h: e.high_24h,
            low_24h: e.low_24h,
            total_volume:e.total_volume,
            total_supply:e.total_supply,
            max_supply:e.max_supply,
            circulating_supply:e.circulating_supply
        }
    })
    
    const create={
        hora:`${horaSplit[0]}:${horaSplit[1]}`,
        activos:infoActivos
    }
   const creacion:any= await activos.create(create)
   return creacion[0].hora

}


export const filterActivos = async (filter: any): Promise<any> => {
    const activos = await getActivos();

    if (filter === 'Price') {
        const orderByPrice = activos.sort(function (a: any, b: any) {
            if (a.current_price > b.current_price) {
                return -1;
            }
            if (b.current_price > a.current_price) {
                return 1;
            }
            return 0;
        })
        return orderByPrice;
    }
    if (filter === 'Market Capitalization') {
        const orderByMarket_cap = activos.sort(function (a: any, b: any) {
            if (a.market_cap > b.market_cap) {
                return -1;
            }
            if (b.market_cap > a.market_cap) {
                return 1;
            }
            return 0;
        })
        return orderByMarket_cap;
    }
    return 'error'


}
export const getActivosMayoresA = async (numeroMinimo:any, activos:any): Promise<any> =>{
    const mayoresAminimo= activos.filter((e:any)=> e.current_price>numeroMinimo);
    //console.log(mayoresAminimo)
    return mayoresAminimo;
}
export const getMenoresA = async (numeroMaximo:any, activos:any): Promise<any> =>{
   
    const menoresAmaximo = activos.filter((e:any)=> e.current_price<numeroMaximo);
    //console.log(menoresAmaximo)
    return menoresAmaximo;
}
