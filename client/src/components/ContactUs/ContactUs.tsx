import React from "react";
import styles from "./ContactUs.module.css";
import Button from "../styles/button";
import Telefono from "../../assets/contact-us.png";
import { useDispatch, useSelector } from "react-redux";
import { postMail } from "../../redux/actions";
import Swal from 'sweetalert2'
const ContactUs = () => {
  const dispatch:any = useDispatch()
  const [state, setState] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const HandleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if(state.name==""||state.message==""||state.email==""){
      Swal.fire(
        'missing parameters',
        '',
        'error'
      )
    }else{
      dispatch(postMail(state))
      Swal.fire(
        'Succesful Sent!',
        'Thank you for your message',
        'success'
        )
      setState({...state,name:"",email:"",message:""})
    }
  };
  return (
      <div className={styles.mainContainer}>
        <img src={Telefono} alt=""  />
        <div className={styles.formContainer}>
          <h3>Contact us</h3>
          <form onSubmit={(e) => HandleSubmit(e)}>
            <input
              onChange={HandleChange}
              type="text"
              name="name"
              placeholder="Your name..."
              value={state.name}
              />
            <input
              onChange={HandleChange}
              type="email"
              name="email"
              placeholder="Email..."
              value={state.email}
              />
            <textarea
              onChange={HandleChange}
              name="message"
              placeholder="Message..."
              value={state.message}
            />
            <Button type="submit" onClick={() => HandleSubmit}>
              Submit
            </Button>
            {/* <h6>Or</h6> */}
          </form>
          {/* <div className={styles.AditionalButtonsContainer}>
            <button className={styles.twitter}>
              <img src={Twitter} alt="" />
            </button>
            <button className={styles.github}>
               <img src={GitHub} alt="" />
            </button>
            <button className={styles.linkedin}>
               <img src={LinkedIn} alt="" />
            </button>
          </div> */}
        </div>
      </div>
  );
};

export default ContactUs;
