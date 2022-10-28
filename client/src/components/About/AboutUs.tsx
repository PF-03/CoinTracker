import React from "react";
import styles from "../styles/AboutUs.module.css";
import ProfileCamiloSar from "../../assets/profile-CamiloSar.png";
import profileAlejandroVillegas from "../../assets/profileAlejandroVillegas.jpg";
import profileJahleel from "../../assets/profileJahleel.jpeg";
import LinkedIn from "../../assets/linkedin.png";
import GitHub from "../../assets/github.png";
const AboutUs = () => {
  const developersInfo: any = [
    {
      profileImage: profileAlejandroVillegas,
      name: "Alejandro Villegas",
      info: "",
      SocialNetworks: [
        {
          logo: LinkedIn,
          link: "https://www.linkedin.com/in/alejandro-villegas-correa-031a91221",
        },
        { logo: GitHub, link: "https://github.com/alejandrovc1" },
      ],
    },
    {
      profileImage: "",
      name: "Fernando Campos",
      info: "",
      SocialNetworks: [
        { logo: LinkedIn, link: "https://www.linkedin.com/in/ferchoeth/" },
        { logo: GitHub, link: "https://github.com/ferchoeth" },
      ],
    },
    {
      profileImage: ProfileCamiloSar,
      name: "Camilo Sarmiento",
      info: "",
      SocialNetworks: [
        { logo: LinkedIn, link: "https://www.linkedin.com/in/camilo-sarmiento-051a80244" },
        { logo: GitHub, link: "https://github.com/Camilo-845" },
      ],
    },
    {
      profileImage: profileJahleel,
      name: "Jahleel Solano",
      info: "",
      SocialNetworks: [
        { logo: LinkedIn, link: "https://www.linkedin.com/in/jahleel-solano-101834206/" },
        { logo: GitHub, link: "https://github.com/Jahleels" },
      ],
    },
    {
      profileImage: "",
      name: "Alexandra Araujo",
      info: "",
      SocialNetworks: [
        { logo: LinkedIn, link: "" },
        { logo: GitHub, link: "https://github.com/AleSangronis" },
      ],
    },
    {
      profileImage: "https://www.linkedin.com/in/j-manuel-garcia-m/",
      name: "Juancarlos Garcia",
      info: "",
      SocialNetworks: [
        { logo: LinkedIn, link: "" },
        { logo: GitHub, link: "https://github.com/ManuGarMon22" },
      ],
    },
    {
      profileImage: "",
      name: "Milagros Vetcher",
      info: "",
      SocialNetworks: [
        { logo: LinkedIn, link: "" },
        { logo: GitHub, link: "https://github.com/milivetcher" },
      ],
    },
    {
      profileImage: "",
      name: "Gugliermo Caliendo",
      info: "",
      SocialNetworks: [
        { logo: LinkedIn, link: "" },
        { logo: GitHub, link: "https://github.com/guglielmoCaliendo" },
      ],
    },
  ];
  return (
    <div className={styles.mainContainer}>
      {developersInfo.map((el: any) => {
        return (
          <div className={styles.developerContainer} key={el.name}>
            <img
              className={styles.developerImage}
              src={el.profileImage}
              alt={`${el.name} Image`}
            />
            <div className={styles.textContainer}>
            <h3>{el.name}</h3>
            <h6>Fullstack Developer</h6>
            </div>
            <div className={styles.socialNet}>
              {el.SocialNetworks.map((sn: any) => {
                return (
                  <a key={sn.link} href={sn.link}>
                    <img src={sn.logo} alt="Logo" />
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutUs;
