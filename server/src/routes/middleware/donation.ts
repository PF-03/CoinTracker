import { Router } from 'express';
import {
    postDonation,
    getDonation
} from '../../controllers/donation'

const donationsRoutes = Router();


donationsRoutes.get('/', getDonation)

donationsRoutes.post('/', postDonation)

// donationsRoutes.put('/', updateExchangeHistory)

// donationsRoutes.delete('/', deleteExchangeHistory)


export default donationsRoutes;