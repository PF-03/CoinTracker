import { useState } from 'react';
import axios from 'axios';
import './Review.css';
import Button from '../styles/button';

function Review() {

    const [inputs, setInputs] = useState({
        username: '',
        calification: '',
        comment: '',
        disabled: true,
        errors: {
            username: '',
            calification: '',
            comment: '',
        },
    });

    function validateForm(errors: Object) {
        let usernameInput = document.getElementById('username');
        let calificationInput = document.getElementById('mail');
        let commentInput = document.getElementById('password');

        let username = usernameInput.getAttribute('value');
        let calification = calificationInput.getAttribute('value');
        let comment = commentInput.getAttribute('value');

        if (!username || !calification || !comment) {
            setInputs({
                ...inputs,
                disabled: true,
            });
            return;
        }

        let valid = true;

        Object.values(errors).forEach((val) => {
            if (val.length > 0) {
                valid = false;
            }
        });

        if (valid) {
            setInputs({
                ...inputs,
                disabled: false,
            });
        } else {
            setInputs({
                ...inputs,
                disabled: true,
            });
        }
    }

    function handleChange(e: any) {
        type InputField =
            | 'username'
            | 'calification'
            | 'comment';

        const { value } = e.target;
        const name: InputField = e.target.name;
        let errors = inputs.errors;

        switch (name) {
            case 'username':
                errors.username = value.length < 1 ? 'Escribe tu correo' : '';
                break;
            case 'calification':
                break;
            case 'comment':
                errors.comment = value.length < 5 ? 'Escribe minimo 10 letras' : '';
                break;
            default:
                break;
        }

        inputs[name] = value;
        setInputs({
            ...inputs,
            [name]: value,
            errors,
        });
        validateForm(inputs.errors);
    }

    async function submitForm(e: any) {
        e.preventDefault();
        try {
            await axios.post('/review', {
                user: inputs.username,
                calification: inputs.calification,
                comment: inputs.comment,
            });
            alert('Tu review ha sido enviada con exito!');
            window.location.href = `/`;
        } catch (error) {
            alert(`Algo salio mal, intenta de nuevo.\n${error}`);
        }
    }

    return (
        <div className='reviewContainer'>
            <h2>Help us to improve</h2>

            <form onSubmit={submitForm} className='reviewForm'>

                <label className='reviewFormLabel' htmlFor='username'>
                    User:{' '}
                </label>
                <input
                    required
                    className='reviewFormInput'
                    name='username'
                    id='username'
                    onChange={handleChange}
                    value={inputs.username}
                />
                {!inputs.errors.username ? null : (
                    <p className='inputError'>{inputs.errors.username}</p>
                )}
                
                <label className='reviewFormLabel' htmlFor='calification'>
                    Rate us:{' '}
                </label>
                <select name="calification" value={inputs.calification} id='calification'  className='reviewFormSelect'>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>

                {/* <input
                    className='reviewFormInput'
                    name='calification'
                    id='calification'
                    onChange={handleChange}
                    value={inputs.calification}
                /> */}

                <label className='reviewFormLabel' htmlFor='comment'>
                    Comment:{' '}
                </label>
                <input
                    required
                    className='reviewFormInput'
                    name='comment'
                    id='comment'
                    onChange={handleChange}
                    value={inputs.comment}
                />
                {!inputs.errors.comment ? null : (
                    <p className='inputError'>{inputs.errors.comment}</p>
                )}

                <Button
                    gradient={inputs.disabled ? false : true}
                    className='submit-btn'
                    id='submit-btn'
                    type='submit'
                >
                    Enviar review
                </Button>
            </form>
        </div>
    );
}
export default Review;
