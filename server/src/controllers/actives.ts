import axios from 'axios';
import activos from '../models/activos';
//import numberFormat from '../../../client/src/utils/numberFormat.js';

export const getActivos = async (): Promise<any> => {
  const datos = await activos.find({});

  return datos[0].activos;
};

export const ActualizarApi = async (): Promise<any> => {
  try {
    let rank: number = 1;
    const url = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    //console.log(url)
    //console.log(JSON.stringify(infoActivos))
    //const activos = JSON.parse(infoActivos)
    const infoActivos = await url.data.map((e: any) => {
      return {
        rank: rank++,
        id: e.id,
        symbol: e.symbol,
        name: e.name,
        image: e.image,
        current_price: e.current_price,
        market_cap: e.market_cap,
        high_24h: e.high_24h,
        low_24h: e.low_24h,
        total_volume: e.total_volume,
        total_supply: e.total_supply,
        max_supply: e.max_supply,
        circulating_supply: e.circulating_supply,
      };
    });
    const date = new Date();
    const horas: any = date.toLocaleTimeString();
    const horaSplit = horas.split(':');
    const fecha = date.toDateString();

    const create = {
      hora: `${horaSplit[0]}:${horaSplit[1]}`,
      fecha: fecha,
      activos: infoActivos,
    };

    const currentActivos = await activos.find({});

    await activos.replaceOne({ _id: currentActivos[0]._id }, create);
  } catch (e) {
    console.log(e);
  }
};

export const getActivosMayoresA = async (
  numeroMinimo: any,
  activos: any
): Promise<any> => {
  const mayoresAminimo = activos.filter(
    (e: any) => e.current_price > numeroMinimo
  );
  //console.log(mayoresAminimo)
  return mayoresAminimo;
};
export const getMenoresA = async (
  numeroMaximo: any,
  activos: any
): Promise<any> => {
  const menoresAmaximo = activos.filter(
    (e: any) => e.current_price < numeroMaximo
  );
  //console.log(menoresAmaximo)
  return menoresAmaximo;
};
