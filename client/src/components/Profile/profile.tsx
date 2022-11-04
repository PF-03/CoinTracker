import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import profile from "./profile.module.css";
import Button from "../styles/button";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Bubble from "../styles/bubbles";
import { getUserId } from "../../redux/actions";
export default function Profile() {
  const user = useSelector((state: any) => state.user);
  const userId = useSelector((state: any) => state.userID);
  const token = useSelector((state: any) => state.userToken);
  const dispatch: any = useDispatch();
  const [cargar, setCargar] = useState(false);
  const [state, setState] = useState({
    username: userId[0] ? userId[0].username : user.username,
    mail: userId[0] ? userId[0].mail : user.mail,
    name: userId[0] ? userId[0].name : user?.name,
    lastname: userId[0] ? userId[0].lastname : user?.lastname,
  });
  console.log(user);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

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
    /* if (!previewSource) return; */
    const formdata: any = await new FormData();
    await formdata.append("image", selectedFile);
    await formdata.append("username", state.username);
    await formdata.append("mail", state.mail);
    await formdata.append("name", state.name);
    await formdata.append("lastname", state.lastname);
    await uploadImage(formdata);
    setCargar(false);
    dispatch(getUserId(user._id));
  };

  const uploadImage = async (formdata) => {
    try {
      await fetch("http://localhost:3001/users/" + user._id, {
        method: "PUT",
        body: formdata,
      });
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
        `http://localhost:3001/mail/verificar/${user.googleId ? user.googleId : token
        }`,
        body
      );
    } catch (e) {
      console.log({ error: e });
    }
  };

  const cancelar = () => {
    setCargar(false);
  };
  return (
    <div className={profile.containerr}>
      <Bubble size="medium" color="blue-dark" top="20%" left="30vh" />
      <Bubble color="purple" top="-40%" right="-20vh" />
      {user.status !== "UNVERIFIED" ? (
        <p> Cuenta verificada</p>
      ) : (
        <div onClick={verifiqued}>
          <p> Cuenta NO verificada</p>
        </div>
      )}

      {cargar === false ? (
        <div className={profile.formulario}>
          <div className={profile.datos}>
            <div className={profile.texto}>
              <div className={profile.campos}>
                <label className={profile.titulo}>Name</label>
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
                <label className={profile.titulo}>Lastname</label>
                <div className={profile.propiedadd}>
                  <label>
                    {userId[0]
                      ? userId[0].lastname
                      : user.lastname
                        ? user.lastname
                        : "None"}{" "}
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
              <div className={profile.div}>Picture</div>
              <div className={profile.imagen}>
                <img
                  className={profile.imgg}
                  src={
                    userId[0]
                      ? userId[0].image.imageURL
                      : user.image
                        ? user.image.imageURL
                        : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png"
                  }
                  alt="profile"
                />
              </div>
              <div className={profile.cargar}>
                <Button gradient onClick={() => cargarImage()}>
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={profile.formulario}>
            <div className={profile.datoss}>
              <div className={profile.texto}>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Name</label>
                  <div className={profile.propiedad}>
                    <input
                      placeholder={userId[0]?.name || user.name}
                      name="name"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                </div>
                <div className={profile.campos}>
                  <label className={profile.titulo}>Lastname</label>
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
              <div className={profile.foto}>
                <div className={profile.div}>Picture</div>
                <div className={profile.imagen}>
                  <img
                    className={profile.imgg}
                    src={
                      previewSource
                        ? previewSource
                        : userId[0]?.image
                          ? userId[0].image
                          : user.image.imageURL ||
                          "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png"
                    }
                    alt="profile"
                  />
                </div>
                <div className={profile.cargar}>
                  <input type="file" name="image" onChange={handleImage} />{" "}
                  <label>Choose File</label>
                </div>
              </div>
            </div>
            <div className={profile.but}>
              <Button type="submit" gradient>
                Guardar
              </Button>
              <Button gradient onClick={() => cancelar()}>
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
