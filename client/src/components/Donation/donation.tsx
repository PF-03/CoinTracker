import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './donation.css';

function Donation() {
    const stripe = useStripe();
    const elements = useElements();

    async function submitDonation(e) {
        e.preventDefault()
        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });
        
        const { id } = paymentMethod;
        const res: any = await axios.post('http://localhost:3001/donate', {
            id,
            amount: 1000
        })
        console.log(res.data);
        
    }

    return (
        <div>
            <h3>You're close to be a great person</h3>
            <p>You will donate $10</p>
            <form onSubmit={submitDonation}>
                <CardElement className='donate-card-element'/>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Donation;