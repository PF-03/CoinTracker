import React from "react";
import styles from "../../styles/AboutUs.module.css"
import ProfileCamiloSar from "../../../assets/profile-CamiloSar.png"
import profileAlejandroVillegas from "../../../assets/profileAlejandroVillegas.jpg"
import LinkedIn from "../../../assets/linkedin.png"
import GitHub from "../../../assets/github.png"
const AboutUs = () => {
    const developersInfo:any=[
        {
            profileImage:profileAlejandroVillegas,
            name:"Alejandro Villegas",
            info:"",
            SocialNetworks:[{logo:LinkedIn,link:"https://www.linkedin.com/in/alejandro-villegas-correa-031a91221"},{logo:GitHub,link:"https://github.com/alejandrovc1"},]
        },
        {
            profileImage:"",
            name:"Fernando Campos",
            info:"",
            SocialNetworks:[{logo:LinkedIn,link:""},{logo:GitHub,link:"https://github.com/ferchoeth"},]
        },
        {
            profileImage:ProfileCamiloSar,
            name:"Camilo Sarmiento",
            info:"",
            SocialNetworks:[{logo:LinkedIn,link:""},{logo:GitHub,link:"https://github.com/Camilo-845"},]
        },
        {
            profileImage:"",
            name:"Jahleel Solano",
            info:"",
            SocialNetworks:[{logo:LinkedIn,link:""},{logo:GitHub,link:"https://github.com/Jahleels"},]
        },
        {
            profileImage:"",
            name:"Alexandra Araujo",
            info:"",
            SocialNetworks:[{logo:LinkedIn,link:""},{logo:GitHub,link:"https://github.com/AleSangronis"},]
        },
        {
            profileImage:"",
            name:"Juancarlos Garcia",
            info:"",
            SocialNetworks:[{logo:LinkedIn,link:""},{logo:GitHub,link:"https://github.com/ManuGarMon22"},]
        },
        {
            profileImage:"",
            name:"Milagros Vetcher",
            info:"",
            SocialNetworks:[{logo:LinkedIn,link:""},{logo:GitHub,link:"https://github.com/milivetcher"},]
        },
        {
            profileImage:"",
            name:"Gugliermo Caliendo",
            info:"",
            SocialNetworks:[{logo:LinkedIn,link:""},{logo:GitHub,link:"https://github.com/guglielmoCaliendo"},]
        },  
    ]
    return(
        <div >
            {developersInfo.map((el:any)=>{
                return(
                <div key={el.name}>
                    <img src={el.profileImage} alt={`${el.name} Image`} />
                    <h3>{el.name}</h3>
                    {el.SocialNetworks.map((sn:any)=>{
                        return(
                        <a key={sn.link} href={sn.link}>
                            <img src={sn.logo} alt="Logo" />
                        </a>
                        )
                    })}
                </div>
                )
            })}
        </div>
    )
}

export default AboutUs;