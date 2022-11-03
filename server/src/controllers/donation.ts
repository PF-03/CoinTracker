import { Request, Response, NextFunction } from "express";
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SK);

const postDonation = async (req: Request, res: Response, next: NextFunction) => {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: 'donation',
        payment_method: id,
        confirm: true
    })
    
    res.send({
        message: 'Succesful payment',
        payment,
    })
}

export {
    postDonation
}