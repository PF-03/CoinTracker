import React from "react";
import styles from "../styles/ContactUs.module.css";
import Button from "../styles/button";
const ContactUs = () => {
  return (
    <div className={styles.mainContainer}>
      <img src="" alt="" />
      <div>
        <h2>Contact us</h2>
        <form action="">
            <input type="text">Name</input>
            <input type="email">Email</input>
            <input type="text" >Message...</input>
            <Button></Button>
            <h6>Or</h6>
        </form>
        <div>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
