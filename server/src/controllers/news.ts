import axios from "axios"
import { Response, Request } from "express"
import  News from "../models/new"

const getNews=async(_req:Request, res:Response)=>{
const date=new Date()
const dateDay= date.toDateString()
console.log(dateDay)
const getModel=await News.find({})
if(getModel.length>0){
    if(getModel[0].fecha===dateDay){
        console.log("no tuve que consultar")
        return res.status(202).json(getModel)
    }
    const getNews=await axios(`https://api.currentsapi.services/v1/search?apiKey=1XA7fNbFLNxrCdLfT98reAw7FWrHXewW6IYrgALug09opXP3&keywords=crypto&category=technology`)
    const clearNewsApi=await getNews.data
    const newD=clearNewsApi.news.map((e:any)=>{
        return {
            title:e.title,
            description:e.description,
            url:e.url,
            author:e.author,
            image:e.image,
            published:e.published,
        }
    })
    const crreateNews={
        fecha:dateDay,
        new:newD
    }
    await News.updateOne({fecha:getModel[0].fecha},crreateNews)
    const dateAll=await News.find({})
    console.log("la cree pq tenia otra fecha")
    res.json(dateAll)
}
else{
    const getNews=await axios(`https://api.currentsapi.services/v1/search?apiKey=1XA7fNbFLNxrCdLfT98reAw7FWrHXewW6IYrgALug09opXP3&keywords=crypto&category=technology`)
    const clearNewsApi=await getNews.data
    const newD=clearNewsApi.news.map((e:any)=>{
        return {
            title:e.title,
            description:e.description,
            url:e.url,
            author:e.author,
            image:e.image,
            published:e.published,
        }
    })
    const crreateNews={
        fecha:dateDay,
        new:newD
    }
    const baseDate=await News.create(crreateNews)
    console.log("la cree x primera vez")
    return res.send(baseDate)
}

}

export default getNews