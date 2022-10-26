import { Request, Response, NextFunction } from "express"

const getExchangeHistory = ((_req: Request, res: Response, _next: NextFunction) => {
    res.send('route get works!')
})

const postExchangeHistory = ((_req: Request, res: Response, _next: NextFunction) => {
    res.send('route post works!')
})

const deleteExchangeHistory = ((_req: Request, res: Response, _next: NextFunction) => {
    res.send('route delete works!')
})

export {
    getExchangeHistory,
    postExchangeHistory,
    deleteExchangeHistory
}