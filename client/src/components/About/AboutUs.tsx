import React from "react";
import styles from "./AboutUs.module.css";
import ProfileCamiloSar from "../../assets/profile-CamiloSar.png";
import profileAlejandroVillegas from "../../assets/profileAlejandroVillegas.jpg";
import profileJahleel from "../../assets/profileJahleel.jpeg";
import profileMilagrosVet from "../../assets/profileMilagrosVet.jpeg";
import profileFernando from "../../assets/profileFernando.jpeg";
import profileGuglielmo from "../../assets/profileGuglielmo.jpeg";
import profileAlexandra from "../../assets/profileAlexandra.jpeg";
import profileManuelGarcia from "../../assets/profileManuelGarcia.jpeg";
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
      profileImage: profileFernando,
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
        {
          logo: LinkedIn,
          link: "https://www.linkedin.com/in/camilo-sarmiento-051a80244",
        },
        { logo: GitHub, link: "https://github.com/Camilo-845" },
      ],
    },
    {
      profileImage: profileJahleel,
      name: "Jahleel Solano",
      info: "",
      SocialNetworks: [
        {
          logo: LinkedIn,
          link: "https://www.linkedin.com/in/jahleel-solano-101834206/",
        },
        { logo: GitHub, link: "https://github.com/Jahleels" },
      ],
    },
    {
      profileImage: profileAlexandra,
      name: "Alexandra Araujo",
      info: "",
      SocialNetworks: [
        {
          logo: LinkedIn,
          link: "https://www.linkedin.com/in/alexandra-carolina-araujo-sangronis-4568a8154/",
        },
        { logo: GitHub, link: "https://github.com/AleSangronis" },
      ],
    },
    {
      profileImage: profileManuelGarcia,
      name: "Juancarlos Garcia",
      info: "",
      SocialNetworks: [
        {
          logo: LinkedIn,
          link: "https://www.linkedin.com/in/j-manuel-garcia-m/",
        },
        { logo: GitHub, link: "https://github.com/ManuGarMon22" },
      ],
    },
    {
      profileImage: profileMilagrosVet,
      name: "Milagros Vetcher",
      info: "",
      SocialNetworks: [
        {
          logo: LinkedIn,
          link: "https://www.linkedin.com/in/milagros-vetcher-369b01123/",
        },
        { logo: GitHub, link: "https://github.com/milivetcher" },
      ],
    },
    {
      profileImage: profileGuglielmo,
      name: "Guglielmo Caliendo",
      info: "",
      SocialNetworks: [
        {
          logo: LinkedIn,
          link: "https://www.linkedin.com/in/guglielmocaliendosilva/",
        },
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
              <h6>{el.name}</h6>
              <span>Fullstack Developer</span>
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
