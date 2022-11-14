/// <reference types="vite/client" />
type coinInfo = {
    id: string
    name: string
    image: string
    current_price: number
    market_cap?: string
}

type newsCard = {
    _id: number
    title: string
    name: string
    image: string
    description?: string
    url?: string
}

type review = {
    user: string
    calification: number
    comment: string
}

type state = {
    activos: coinInfo[]
    allactivos: []
    newsAll: []
    allNews: newsCard[]
    detailsActivos: {}
    detailsNews: newsCard
    seeMore: boolean
    cotizaciones: []
    user: string
    userID: string
    review: review[]
}
