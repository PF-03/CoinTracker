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
            <Link to=""><img src={LinkedIn} alt="" /></Link>
            <Link to=""><img src={GitHub} alt="" /></Link>
            <Link to=""><img src={facebook} alt="" /></Link>
        </div>
        <div>
            <button>Home</button>
            <button>Services</button>
            <button>About</button>
            <button>Terms</button>
            <button>Privacy Policy</button>
        </div>
        <h6>CoinTracker © 2022</h6>
    </div>
  );
};

export default AboutUs;