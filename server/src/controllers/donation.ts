import { Request, Response, NextFunction } from "express";
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SK);

const postDonation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, id } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'donation',
            payment_method_types: ['card'],
            payment_method: id,
            confirm: true
        })
        res.status(200).send({
            message: 'Succesful payment',
            paymentIntent,
        })
    } catch(error: any) {
        res.status(402).send({
            message: `${error.code} - ${error.decline_code}`
        })
    }
}

export {
    postDonation
}