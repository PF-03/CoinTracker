import AboutUs from "../../components/About/AboutUs";
import Card from "../../components/card/card";
import ContactUs from "../../components/ContactUs/ContactUs";
import LandingNavbar from "../../components/navbar/LandingNavbar";
import Bubble from "../../components/styles/bubbles";
import Button from "../../components/styles/button";
import s from "./landingPage.module.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer"
import Review from "../../components/Review/Review";
import Comments from "../../components/Review/Comments";


function LandignPage() {
  return (
    <>
      <LandingNavbar />
      <Bubble size="small" color="blue-light" left="-3rem" top="7rem" />
      <Bubble size="large" color="red" right="-20vh" top="-10vh" />
      <main id="home" className={s.main}>
        <h1>
          Create your crypto <br />
          Wallet.
        </h1>
        <p>
          And follow your coin changes, wherever you are. Join and be part of
          the future.
        </p>
        <div>
          <Link to="/login">
            <Button gradient>Let's do it</Button>
          </Link>
        </div>
        <div className={s.card}>
          <Card
            name="Bitcoin"
            id="bitcoin"
            current_price={20.58}
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"
          />
        </div>
      </main>
      <div id="About" className={s.containerAbout}>
        <h3>
          About Us <span className={s.gradientText}>(Our Team)</span>
        </h3>
        <AboutUs />
      </div>

      <div id="Reviews" className={s.container}>
        <h3>Feedback</h3>
        <div className={s.reviews}>
          <Comments />
          <Review />
        </div>
      </div>

      <div id="ContactUs" className={s.container}>
        <Bubble size="small" color="blue-light" right="20%" />
        <ContactUs />
        <Bubble left="20%" bottom="-10vh" size="medium" />
      </div>

      <Footer></Footer>
    </>
  );
}

export default LandignPage;
