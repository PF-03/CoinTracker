import { Request, Response, NextFunction } from "express";
const DonationModel = require('../models/donations')
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SK);

const postDonation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, paymentMethodId, username, mail } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'donation',
            payment_method_types: ['card'],
            payment_method: paymentMethodId,
            confirm: true
        })

        const donation = new DonationModel({
            username,
            mail,
            amount: amount/100,
            date: new Date()
        })
        donation.save()

        res.status(200).send({
            message: 'Succesful payment'
        })
    } catch(error: any) {
        res.status(402).send({
            message: `${error.code} - ${error.decline_code}`
        })
    }
}

// necesita el username por body
const getDonation = (req: Request, res: Response, next: NextFunction) => {
    DonationModel.find({ username: req.body.username})
    .then((result: Object[]) => {
        res.send(result)
    })
    .catch((err: Error) => {
        next(err)
    })
}

export {
    postDonation,
    getDonation
}