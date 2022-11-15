import Bubble from '../styles/bubbles';
import donationGratitude from '../../assets/donationGratitude.png'
import './DonationSuccess.css'

function DonationSuccess() {
    return (
        <div>
            <Bubble color='purple' size='medium' bottom={0} left='17vw' />
            <Bubble color='blue-dark' size='small' right={0} top='10vh' />

            <div className='donationGratitudeMessage-component'>
                <div className='donationGratitudeMessage-container'>
                    <h4>Wow, that was a lot money! 💵</h4>
                    <div className='donationMessage-inner-container'>
                        <h6>Thank you for trusting us!</h6>
                        <p className='p-text'>Your donation helps grow, develop new features and keep us doing what we love. Coding.</p>
                        <p className='p-text'>Receive this flower as a sign of our love and gratitude.</p>
                        <img src={donationGratitude} alt="donation gratitude message"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonationSuccess;