import AboutUs from "../../components/About/AboutUs";
import Card from "../../components/card/card";
import ContactUs from "../../components/ContactUs/ContactUs";
import LandingNavbar from "../../components/navbar/LandingNavbar";
import Bubble from "../../components/styles/bubbles";
import Button from "../../components/styles/button";
import s from "./landingPage.module.css";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActivos } from "../../redux/actions";
import numberFormat from "../../utils/numberFormat.js";

import Footer from "../../components/Footer/Footer"
import Review from "../../components/Review/Review";
import Comments from "../../components/Review/Comments";



function LandignPage() {
  const activos = useSelector((state: state) => state.activos.slice(0, 4));
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getActivos())

  }, [])


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

          <Link to='/login'>

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

      <h2 style={{ marginLeft: '4rem' }}>Track every movement.</h2>
      <section className={`${s.container} ${s.tableContainer}`}>
        <Bubble size="medium" right='3rem' top='-5rem' />
        <table className={s.table}>
          <tr>
            <th>
              Name
            </th>
            <th>
              Price
            </th>
            <th>
              Market Capitalization
            </th>
          </tr>
          <tbody>
            {activos.map(activo => (
              <tr>
                <td className={s.imgContainer}>
                  <img src={activo.image} />
                  {activo.name}
                </td>
                <td>
                  {'USD ' + numberFormat(activo.current_price, 'standard', 'decimal')}
                </td>
                <td>
                  {'USD ' + numberFormat(activo.market_cap, 'standard', 'decimal')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      

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
