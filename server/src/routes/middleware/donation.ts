import { Router } from 'express';
import {
    postDonation
} from '../../controllers/donation'

const donationsRoutes = Router();


// donationsRoutes.get('/', getExchangeHistory)

donationsRoutes.post('/', postDonation)

// donationsRoutes.put('/', updateExchangeHistory)

// donationsRoutes.delete('/', deleteExchangeHistory)


export default donationsRoutes;