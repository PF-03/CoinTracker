import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";
import Button from "../styles/button";
import { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import './donation.css';
import cardFrontImg from '../../assets/credit-card-front.png'
import cardBackImg from '../../assets/credit-card-back.png'
import creditCard from '../../assets/credit-card.png'
import visaIcon from '../../assets/visa-icon.png'
import mastercardIcon from '../../assets/mastercard-icon.png'

function Donation() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [ donationAmount, setDonationAmount ] = useState(0);
    const [ cardInfo, setCardInfo ] = useState({
        number: '****',
        expiration: 'MM/AA',
        cvc: 'CVC',
    });

    function handleDonationChange(e: any) {
        const value = e.target.value;
        setDonationAmount(value * 100);
    }

    async function handleCardInfoChange(e: any) {
            let cardIcon;
            if(e.complete) {
                cardIcon = document.getElementById('credit-card-brand');
                if(e.brand === 'visa') {
                    cardIcon.src = visaIcon;
                }
                if(e.brand === 'mastercard') {
                    cardIcon.src = mastercardIcon;
                }
                const result = await stripe.createToken(elements.getElement(CardNumberElement))
                if(result.token) {
                    let exp_month = result.token.card.exp_month
                    let exp_year = String(result.token.card.exp_year).slice(-2)
                    setCardInfo({
                        ...cardInfo,
                        number: result.token.card.last4,
                        expiration: `${exp_month}/${exp_year}`
                    })
                }
            }
    }

    async function submitDonation(e) {
        e.preventDefault()
        try {
            const { paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardNumberElement)
            });
            const { id } = paymentMethod;
            const user = JSON.parse(localStorage.getItem('CoinTrackerUser'));
            const { username, mail } = user
            const res: any = await axios.post('http://localhost:3001/donate', {
                amount: donationAmount,
                paymentMethodId: id,
                username,
                mail,
            })
            // console.log(res.data);
            Swal.fire({
                icon: 'success',
                title: 'Thanks a lot!',
                text: 'Your support help us grow.',
                confirmButtonText: "Close"
            })
            navigate("/home");
        } catch(error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops, something went wrong',
                text: `${error.response.data.message}`,
                confirmButtonText: 'Try again'
            })
        }
    }

    return (
        <div className='donation-comp-container'>
            <h3>You're almost there.</h3>
            <div className='donation-amount-container'>
                <label htmlFor='donation-amount'>How much do you want to donate?</label>
                <input id='donation-amount' type="number" onChange={handleDonationChange} placeholder='$10'/>
            </div>

            <div className='card-info-container'>
                <form className='card-info-form' onSubmit={submitDonation}>
                    {/* <CardElement className='donate-card-element'/> */}
                    <label htmlFor="donate-card-element">CARD NUMBER</label>
                    <CardNumberElement onChange={handleCardInfoChange} id='donate-card-number' className='donate-card-element'/>

                    <label htmlFor='donate-card-element'>EXP. DATE (MM/YY)</label>
                    <CardExpiryElement onChange={handleCardInfoChange} id='donate-card-exp-date' className='donate-card-element'/>

                    <label htmlFor='donate-card-element'>CVC</label>
                    <CardCvcElement onChange={handleCardInfoChange} id='donate-card-cvc' className='donate-card-element'/>

                    <Button disabled={donationAmount > 0 ? false : true} className='donate-btn' gradient={donationAmount > 0 ? true : false} >Donate</Button>
                </form>
                <div className='card-img-container'>
                    <div className='card-front-container'>
                        <img className='card-front-img' src={cardFrontImg} alt="card-front" />
                        <span id='cardNumberSpan'>
                            {`**** **** **** ${cardInfo.number}`}
                            <img id='credit-card-brand' src={creditCard} alt="credit-card-icon" />
                        </span>
                        <span id='cardExpDateSpan'>{cardInfo.expiration}</span>
                        <span id='circleFullDetailSpan'></span>
                        <span id='circleBorderDetailSpan'></span>
                    </div>
                    <div className='card-back-container'>
                        <img className='card-back-img' src={cardBackImg} alt="card-back" />
                        <span id='cardCvcSpan'>{cardInfo.cvc}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donation;