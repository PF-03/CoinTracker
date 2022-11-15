import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";
import Button from "../styles/button";
import { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import './donation.css';
import s from '../styles/styles.module.css'
import cardFrontImg from '../../assets/credit-card-front.png'
import cardBackImg from '../../assets/credit-card-back.png'
import creditCard from '../../assets/credit-card.png'
import visaIcon from '../../assets/visa-icon.png'
import mastercardIcon from '../../assets/mastercard-icon.png'
import Bubble from '../styles/bubbles';
import { PrivateRoutes } from "../../rutas/rutas";

function Donation() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [donationAmount, setDonationAmount] = useState(0);
    const [cardInfo, setCardInfo] = useState({
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
        if (e.complete) {
            cardIcon = document.getElementById('credit-card-brand');
            if (e.brand === 'visa') {
                cardIcon.src = visaIcon;
            }
            if (e.brand === 'mastercard') {
                cardIcon.src = mastercardIcon;
            }
            const result = await stripe.createToken(elements.getElement(CardNumberElement))
            if (result.token) {
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
            const res: any = await axios.post('/donate', {
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
                timer: 1500
                // confirmButtonText: "Close"
            })
            navigate(PrivateRoutes.DONATE_SUCCESS);
        } catch (error) {
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
            <Bubble color='purple' size='medium' bottom={0} left='17vw' />
            <Bubble color='blue-dark' size='small' right={0} top='10vh' />
            <h3>You're almost there.</h3>
            <p>How would you like to donate?</p>
            <details className='donation-opt-details-tag'>
                <summary className='donations-opt-summary-tag'>Credit/debit card</summary>

                <div className='donation-amount-container'>
                    <label htmlFor='donation-amount'>How much do you want to donate?</label>
                    <input id='donation-amount' type="number" onChange={handleDonationChange} placeholder='$10' />
                </div>

                <div className='card-info-container'>
                    <form className={`card-info-form ${s.card}`} onSubmit={submitDonation}>
                        {/* <CardElement className='donate-card-element'/> */}
                        <label htmlFor="donate-card-element">CARD NUMBER</label>
                        <CardNumberElement onChange={handleCardInfoChange} id='donate-card-number' className='donate-card-element' />

                        <label htmlFor='donate-card-element'>EXP. DATE (MM/YY)</label>
                        <CardExpiryElement onChange={handleCardInfoChange} id='donate-card-exp-date' className='donate-card-element' />

                        <label htmlFor='donate-card-element'>CVC</label>
                        <CardCvcElement onChange={handleCardInfoChange} id='donate-card-cvc' className='donate-card-element' />

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
            </details>
            <details className='donation-opt-details-tag'>
                <summary className='donations-opt-summary-tag'>Bitcoin</summary>

                <form className="bitpay-donate" action="https://test.bitpay.com/checkout" method="post">
                    <input name="action" type="hidden" value="checkout" />
                    <fieldset>
                        <ul>
                            {/* <li className="bitpay-donate-field">
                        <label>Email:</label>
                        <input className="bitpay-donate-field-email field-input" name="buyerEmail" type="email" placeholder="Email address (optional)" />
                        </li> */}
                            <li className="bitpay-donate-field">
                                <label>Amount:</label>
                                <div className="field-input-wrapper">
                                    <input className="bitpay-donate-field-price field-input" name="price" type="number" placeholder="Amount" min="0.000006" step="0.000001" />
                                    <select className="bitpay-donate-field-currency field-input" name="currency" value="">
                                        <option selected={true} value="USD">USD</option>
                                        <option value="BTC">BTC</option>
                                        {/* <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="AUD">AUD</option>
                            <option value="BGN">BGN</option>
                            <option value="BRL">BRL</option>
                            <option value="CAD">CAD</option>
                            <option value="CHF">CHF</option>
                            <option value="CNY">CNY</option>
                            <option value="CZK">CZK</option>
                            <option value="DKK">DKK</option>
                            <option value="HKD">HKD</option>
                            <option value="HRK">HRK</option>
                            <option value="HUF">HUF</option>
                            <option value="IDR">IDR</option>
                            <option value="ILS">ILS</option>
                            <option value="INR">INR</option>
                            <option value="JPY">JPY</option>
                            <option value="KRW">KRW</option>
                            <option value="LTL">LTL</option>
                            <option value="LVL">LVL</option>
                            <option value="MXN">MXN</option>
                            <option value="MYR">MYR</option>
                            <option value="NOK">NOK</option>
                            <option value="NZD">NZD</option>
                            <option value="PHP">PHP</option>
                            <option value="PLN">PLN</option>
                            <option value="RON">RON</option>
                            <option value="RUB">RUB</option>
                            <option value="SEK">SEK</option>
                            <option value="SGD">SGD</option>
                            <option value="THB">THB</option>
                            <option value="TRY">TRY</option>
                            <option value="ZAR">ZAR</option> */}
                                    </select>
                                </div>
                            </li>
                        </ul>
                        <input type="hidden" name="data" value="WaVtoxHxEbAFHThmvIFjJUOejRHno6ZszfV3EjXV5MKfDwU9ontrToNAuZ8KosmCDlV9mcQjtwukgYeHybEjTNFn1tbZWfsxz0CDgOdZap7BSoMojZTt4Dh/GqRNCtj7+UEn4SFVpehrtkktrbh6fUVg7+qHDJnf/+qyPzSH9SkxGA6Vbo7MlXiWLlt2gNf6AJBANH87Gm5tJE/DfWkrkUfJVVnTAUhJ+9AkBPGmClnldUDqKF8SLAnVSrWiaVvkN2Z2RcY8x2uvzOzfKVJo/UwO/oQo8/SkPRwh+dfqAWw=" />
                        <div className="bitpay-donate-button-wrapper">
                            <input className="bitpay-donate-button" name="submit" src="https://test.bitpay.com/cdn/en_US/bp-btn-donate-currencies.svg" type="image" alt="BitPay, the easy way to pay with bitcoins." />
                        </div>
                    </fieldset>
                </form>
            </details>
        </div>
    );
}

export default Donation;