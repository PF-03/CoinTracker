import { Request, Response, NextFunction } from "express"
const ExchangeHistoryModel = require('../models/ExchangeHistory')


// get exchange history by username
// recibe en el body de la request:
// username
const getExchangeHistory = ((req: Request, res: Response, next: NextFunction) => {
    ExchangeHistoryModel.find({ username: req.body.username})
    .then((result: Object[]) => {
        res.send(result)
    })
    .catch((err: Error) => {
        next(err)
    })
})

// post exchange move
// recibe en el body de la request:
// crypto1, crypto2, quantity1, quantity2, price1, price2, date, username
const postExchangeHistory = ((req: Request, res: Response, next: NextFunction) => {
    const {
        crypto1,
        crypto2,
        quantity1,
        quantity2,
        price1,
        price2,
        date,
        username
    } = req.body;

    const exchange = new ExchangeHistoryModel({
        crypto1,
        crypto2,
        quantity1,
        quantity2,
        price1,
        price2,
        date,
        username
    })

    exchange.save()
    .then((result: Object) => {
        res.status(201).send(result)
    })
    .catch((err: Error) => {
        console.log(err);
        next(err);
    })
})

// update an exchange by id
// recibe en el body de la request:
// id, crypto1, crypto2, quantity1, quantity2, price1, price2, date, username
const updateExchangeHistory = ((req: Request, res: Response, next: NextFunction) => {
    const {
        id,
        crypto1,
        crypto2,
        quantity1,
        quantity2,
        price1,
        price2,
        date,
        username
    } = req.body;

    ExchangeHistoryModel.replaceOne({ _id: id }, {
        crypto1,
        crypto2,
        quantity1,
        quantity2,
        price1,
        price2,
        date,
        username
    })
    .then((result: Object) => {
        res.status(201).send(result)
    })
    .catch((err: Error) => {
        console.log(err);
        next(err);
    })
})

// delete exchange register
// recibe en el body de la request:
// id
const deleteExchangeHistory = ((req: Request, res: Response, next: NextFunction) => {
    ExchangeHistoryModel.findOneAndDelete({ _id: req.body.id })
    .then((result: Object) => {
        res.send(result)
    })
    .catch((err: Error) => {
        console.log(err);
        next(err);
    })
})

export {
    getExchangeHistory,
    postExchangeHistory,
    updateExchangeHistory,
    deleteExchangeHistory
}