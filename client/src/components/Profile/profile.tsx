import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import profile from "./profile.module.css";
import Button from "../styles/button";
import axios from "axios";
import Bubble from "../styles/bubbles";
import { getUserId, setUser } from "../../redux/actions";
import ProfileIMG from "./ProfileIMG.png";
import { OpenClose } from "../ProfilePassword/openClose";
import { ProfilePassword } from "../ProfilePassword/profilePassword";
import x from "../../assets/x.png";
import bien from "../../assets/bien.png";
import ProfileAlerta from "../ProfileAlerta/profileAlerta";
import { OpenCloseAlert } from "../ProfileAlerta/openClose";
import Swal from "sweetalert2";
export default function Profile() {
  const user = useSelector((state: any) => state.user);
  const userId = useSelector((state: any) => state.userID);

  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getUserId(user._id));
  }, []);
  
  const [cargar, setCargar] = useState(false);
  const [state, setState] = useState({
    username: userId[0] ? userId[0].username : user.username,
    mail: userId[0] ? userId[0].mail : user.mail,
    name: userId[0] ? userId[0].name : user.name,
    lastname: userId[0] ? userId[0].lastname : user.lastname,
  });
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [isOpen, open, close] = OpenClose();
  const [abierto, closee] = OpenCloseAlert();
  const handleImage = async (e) => {
    const image = e.target.files[0];
    setSelectedFile(image);
    previewFile(image);
  };

  const cargarImage = () => {
    setCargar(true);
  };

  const previewFile = async (file) => {
    const reader: any = await new FileReader();
    await reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata: any = await new FormData();
    await formdata.append("image", selectedFile);
    await formdata.append("username", state.username);
    await formdata.append("mail", state.mail);
    await formdata.append("name", state.name);
    await formdata.append("lastname", state.lastname);
    await uploadImage(formdata);
    setCargar(false);
    await dispatch(getUserId(user._id ? user._id : user[0]._id));
  };

  const uploadImage = async (formdata) => {
    try {
      await fetch(
        `${import.meta.env.VITE_SERVER_API}/users/${user._id ? user._id : user[0]._id}`,
        {
          method: "PUT",
          body: formdata,
        }
      );
    } catch (e) {
      console.log({ error: e });
    }
  };

  let body = {
    name: user.name,
    mail: user.mail,
  };

  const verifiqued = async () => {
    try {
      await axios.post(
        `/mail/verificar/${user._id}`,
        body).then(() =>
        Swal.fire({
          icon: "success",
          title: "Check out your mail",
          confirmButtonText: "Ok!",
        })
    } catch (e) {
      console.log({ error: e });
    }
  };

  const cancelar = () => {
    setCargar(false);
  };

  const openModal = () => {
    open();
  };
  return (
    <div className={profile.containerr}>
      <Bubble size="medium" color="blue-dark" top="20%" left="30vh" />
      <Bubble color="purple" top="-40%" right="-20vh" />
      {(userId[0]?.status
        ? userId[0].status
        : user.status
        ? user.status
        : user[0].status) !== "VERIFICADO" && (
        <ProfileAlerta abierto={abierto} close={closee} />
      )}
      {cargar === false ? (
        <div className={profile.box}>
          <div className={profile.formulario}>
            <div className={profile.datos}>
              <div className={profile.texto}>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Your Name</label>
                  <div className={profile.propiedadd}>
                    <label>
                      {userId[0]
                        ? userId[0].name
                        : user.name
                          ? user.name
                          : "None"}{" "}
                    </label>
                  </div>
                </div>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Your Lastname</label>
                  <div className={profile.propiedadd}>
                    <label>
                      {userId[0]
                        ? userId[0].lastname
                        : user.lastname
                          ? user.lastname
                          : "None"}
                    </label>
                  </div>
                </div>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Username</label>
                  <div className={profile.propiedadd}>
                    <label>
                      {userId[0]
                        ? userId[0].username
                        : user.username
                          ? user.username
                          : "None"}{" "}
                    </label>
                  </div>
                </div>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Mail</label>
                  <div className={profile.propiedadd}>
                    <label>
                      {userId[0]
                        ? userId[0].mail
                        : user.mail
                          ? user.mail
                          : "None"}{" "}
                    </label>
                  </div>
                </div>
              </div>
              <div className={profile.foto}>
                <div className={profile.imagen}>
                  <img
                    className={profile.imgg}
                    src={
                      userId[0]?.image?.imageURL
                        ? userId[0]?.image?.imageURL
                        : user.image
                          ? user.image.imageURL
                          : ProfileIMG
                    }
                    alt="profile"
                  />
                </div>
              </div>
            </div>
          </div>
          {(userId[0]?.status
            ? userId[0].status
            : user.status

            ? user.status
            : user[0].status) !== "VERIFICADO" ? (

            <div>
              <img src={x} alt="x" className={profile.icon} />
              <label> Your account is not verified. </label>
              <label className={profile.verificacion} onClick={verifiqued}>
                Click here for verifying
              </label>
            </div>
          ) : (
            <div>
              <img src={bien} alt="bien" className={profile.icon} />
              <label> Your account is verified. </label>
            </div>
          )}
          <div className={profile.cargar}>
            <Button
              gradient={
                (userId[0]?.status ? userId[0].status : user.status) !==
                "VERIFICADO"
                  ? false
                  : true
              }
              onClick={() => cargarImage()}
              disabled={

                (userId[0]?.status ? userId[0].status : user.status) !==
                "VERIFICADO"

                  ? true
                  : false
              }
            >
              Editar Perfil
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={profile.box}>
          <div className={profile.formulario}>
            <div className={profile.datoss}>
              <div className={profile.texto}>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Your name</label>
                  <div className={profile.propiedad}>
                    <input
                      placeholder={userId[0]?.name || user.name}
                      name="name"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                </div>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Your Lastname</label>
                  <div className={profile.propiedad}>
                    <input
                      placeholder={userId[0]?.lastname || user.lastname}
                      name="lastname"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                </div>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Username</label>
                  <div className={profile.propiedad}>
                    <input
                      placeholder={userId[0]?.username || user.username}
                      name="username"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                </div>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Mail</label>
                  <div className={profile.propiedad}>
                    <input
                      placeholder={userId[0]?.mail || user.mail}
                      name="mail"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className={profile.fotos}>
                <div className={profile.imagen}>
                  <img
                    className={profile.imgg}
                    src={
                      previewSource
                        ? previewSource
                        : userId[0]?.image
                          ? userId[0].image.imageURL
                          : ProfileIMG
                    }
                    alt="profile"
                  />
                </div>
                <div className={profile.cargar}>
                  <input type="file" name="image" onChange={handleImage} />{" "}
                </div>
              </div>
            </div>
          </div>
          {(userId[0]?.status
            ? userId[0].status
            : user.status

            ? user.status
            : user[0].status) !== "VERIFICADO" ? (

            <div>
              <label className={profile.rojo}>
                <strong>x</strong>
              </label>
              <label> Your account is not verified. </label>
              <label className={profile.verificacion} onClick={verifiqued}>
                Click here for verifying
              </label>
            </div>
          ) : (
            <div>
              <label className={profile.verde}>
                <strong>✓</strong>
              </label>
              <label> Your account is verified. </label>
              {user.googleId || userId[0]?.googleId ? (
                <label></label>
              ) : (
                <label onClick={openModal} className={profile.pass}>
                  {" "}
                  Click to change password{" "}
                </label>
              )}
            </div>
          )}
          <ProfilePassword isOpen={isOpen} close={close} />
          <div className={profile.but}>
            <Button type="submit" gradient>
              Guardar
            </Button>
            <Button onClick={() => cancelar()}>Cancelar</Button>
          </div>
        </form>
      )}
    </div>
  );
}
