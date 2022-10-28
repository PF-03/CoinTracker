import LandingNavbar from '../../components/navbar/LandingNavbar';
import Bubble from '../../components/styles/bubbles';
import Button from '../../components/styles/button';
import s from './landingPage.module.css'

function LandignPage() {
    return ( 
        <>
            <LandingNavbar />
            <Bubble size='small' color='blue-light' left='-3rem' top='7rem' />
            <Bubble size='large' color='red' right='-20vh' top='-10vh'/>
            <main className={s.main}>
                <h1>Un titulo emocionante</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, hic.</p>
                <div>
                    <Button gradient>Botón</Button>
                </div>
            </main>
            <section className={s.aboutUs}>

            </section>
        </>
     );
}

export default LandignPage;

