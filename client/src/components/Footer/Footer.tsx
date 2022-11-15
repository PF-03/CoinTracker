import React from "react";
import styles from "./Footer.module.css";
import LinkedIn from "../../assets/linkedin.png";
import GitHub from "../../assets/github.png";
import facebook from "../../assets/facebook.png"
import { Link } from "react-router-dom";
const AboutUs = () => {
  return (
    <div className={styles.mainContainer}>
      <div>
        <a href="#About" ><img src={LinkedIn} alt="" /></a>
        <a href="#About" ><img src={GitHub} alt="" /></a>
      </div>
      <div>
        <Link to="/home"><button>Home</button></Link>
        <Link to="/home"><button>Services</button></Link>
        <a href="#About" ><button>Developers</button></a>
        {/* <button>Terms</button>
        <button>Privacy Policy</button> */}
      </div>
      <h6>CoinTracker © 2022</h6>
    </div>
  );
};

export default AboutUs;