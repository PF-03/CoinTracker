import { Router } from "express"
import getNews from "../../controllers/news"

const news:any=Router()

news.get("/",getNews)

export default news