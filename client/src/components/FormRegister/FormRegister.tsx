import { useState} from "react";

function FormRegister(){
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        mail: '',
        name: '',
        lastname: '',
        disabled: true,
        errors: {
            username: 'Necesitas un nombre usuario',
            password: 'Crea una contraseña para estar seguro',
            mail: 'Inserta un email valido',
        }
    })

    function handleChange(e: any) {
        console.log(e.target.value)
    }

    return <form>
        <label htmlFor="name">Nombre: </label>
        <input name='name' id='name' onChange={handleChange} placeholder="Juan"/>

        <label htmlFor="lastname">Apellido: </label>
        <input name='lastname' id='lastname' onChange={handleChange} placeholder="Perez"/>

        <label htmlFor="username">Usuario: </label>
        <input name='username' id='username' onChange={handleChange} placeholder="Perez"/>

        <label htmlFor="mail">Email: </label>
        <input name='mail' id='mail' onChange={handleChange} placeholder="Perez"/>

        <label htmlFor="password">Contraseña: </label>
        <input name='password' id='password' onChange={handleChange} placeholder="Perez"/>
    </form>
}

export default FormRegister;