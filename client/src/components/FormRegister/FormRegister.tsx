import { useState} from "react";
import axios from 'axios';

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
            name: '',
            lastname: ''
        }
    })

    function validateForm(errors: Object) {
        let submitBtn = document.getElementById("submit-btn");
        let valid = true;
        Object.values(errors).forEach((val) => {
            if(val.length > 0) {
                valid = false
            }
        });
        if(valid) {
          setInputs({
            ...inputs,
            disabled: false
          })
          submitBtn?.classList.add("submit-btn-active")
        } else {
          setInputs({
            ...inputs,
            disabled: true
          })
          submitBtn?.classList.remove("submit-btn-active")
        }
    }

    function handleChange(e: any) {
        type InputField = 'name' | 'lastname' | 'username' | 'mail' | 'password'

        const { value } = e.target;
        const name: InputField = e.target.name;
        let errors = inputs.errors;

        switch(name) {
            case 'name':
                break;
            case 'lastname':
                break;
            case 'username':
                errors.username = value.length < 5 ? 'Usa minimo 5 letras' : '';
                break;
            case 'mail':
                let emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.
                errors.mail = !emailPattern.test(value) ? 'Inserta un email valido' : '';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Usa minimo 8 caracteres' : '';
                break;
            default:
                break;
        }

        inputs[name] = value
        setInputs({
            ...inputs,
            [name]: value,
            errors
        })

        validateForm(inputs.errors)
    }

    async function submitForm(e: any) {
        e.preventDefault()
        try {
            let userCreated = await axios.post('http://localhost:3001/users', {
                username: inputs.username,
                password: inputs.password,
                mail: inputs.mail,
                name: inputs.name,
                lastname: inputs.lastname
            })
            alert('Genial, tu cuenta se creo con éxito.')
            window.location.href = `/`;
        } catch(error) {
            alert(`Ups, algo salio mal intenta de nuevo.\n${error}`)
        }
    }

    return <form onSubmit={submitForm}>
        <label htmlFor="name">Nombre: </label>
        <input name='name' id='name' onChange={handleChange} placeholder="Juan"/>
        {!inputs.errors.name ? null : <p>{inputs.errors.name}</p>}

        <label htmlFor="lastname">Apellido: </label>
        <input name='lastname' id='lastname' onChange={handleChange} placeholder="Perez"/>
        {!inputs.errors.lastname ? null : <p>{inputs.errors.lastname}</p>}

        <label htmlFor="username">Usuario: </label>
        <input name='username' id='username' onChange={handleChange} placeholder="Perez"/>
        {!inputs.errors.username ? null : <p>{inputs.errors.username}</p>}

        <label htmlFor="mail">Email: </label>
        <input name='mail' id='mail' onChange={handleChange} placeholder="Perez"/>
        {!inputs.errors.mail ? null : <p>{inputs.errors.mail}</p>}

        <label htmlFor="password">Contraseña: </label>
        <input name='password' id='password' onChange={handleChange} placeholder="Perez"/>
        {!inputs.errors.password ? null : <p>{inputs.errors.password}</p>}

        <input id='submit-btn' type="submit" value='Crear' disabled={inputs.disabled}/>
    </form>
}

export default FormRegister;