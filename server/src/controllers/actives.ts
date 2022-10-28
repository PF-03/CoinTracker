import axios from 'axios';

export const getActivos = async (): Promise<any> => {
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
        return infoActivos;
    } catch (e) { return 'error' }
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
