require("dotenv").config();
import axios from "axios";
import { Response, Request } from "express";
import News from "../models/new";
import handleError from "../utils/handleError";
const KEYAPI_NEWS = process.env.KEYAPI_NEWS;

const getNews = async (_req: Request, res: Response) => {
  const date = new Date();
  const dateDay = date.toDateString();
  const getModel = await News.find({});

  try {
    if (getModel.length == 0 || getModel[0].fecha !== dateDay) {
      await News.deleteMany({});
      const getNews = await axios(
        `https://api.currentsapi.services/v1/search?apiKey=${KEYAPI_NEWS}&keywords=crypto&category=technology`
      );
      const clearNewsApi = await getNews.data;
      const newD = clearNewsApi.news.map((e: any) => {
        let neew = {
          title: e.title,
          description: e.description,
          url: e.url,
          author: e.author,
          image:
            e.image && e.image === "None"
              ? "https://fotos.perfil.com/2021/10/07/trim/950/534/bitcoin-1241867.jpg"
              : e.image,
          published: e.published,
        };
        return neew;
      });

      const crreateNews = {
        fecha: dateDay,
        new: newD,
      };
      const baseDate = await News.create(crreateNews);
      const dateAll = await News.find({});
      return res.json(dateAll);
    }

    return res.json(getModel);
  } catch (e) {
    handleError(res, "ERROR_GET_NEWS");
  }
};

export default getNews;
