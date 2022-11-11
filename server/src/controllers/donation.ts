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
            amount: amount / 100,
            date: new Date()
        })
        donation.save()

        res.status(200).send({
            message: 'Succesful payment'
        })
    } catch (error: any) {
        res.status(402).send({
            message: `${error.code} - ${error.decline_code}`
        })
    }
}


const getDonation: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let allDonations: Object = await DonationModel.find({})
        return res.status(202).json(allDonations)
    }
    catch (e) {
        console.log(e)
    }
}


// const getUsers: any = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       if (!id) {
//         let userAll: Object = await user.find({});
//         return res.status(202).json(userAll);
//       } else {
//         const userId: Object = await user.find({ _id: id });
//         if (Object.keys(userId).length > 0) {
//           return res.status(202).json(userId);
//         }
//         handleError(res, "ERROR_GET_USERS_ID");
//       }
//     } catch (e) {
//       handleError(res, "ERROR_GET_USERS");
//     }
//   };

export {
    postDonation,
    getDonation
}