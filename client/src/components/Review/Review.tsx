import { useState } from 'react';
import axios from 'axios';
import './Review.css';
import Button from '../styles/button';
import Rating from './Rating';
import Swal from 'sweetalert2';

function Review() {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        setInputs({
            ...inputs,
            calification: newRating,
        });
    };

    const [inputs, setInputs] = useState({
        username: '',
        calification: 0,
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
                errors.username = value.length < 1 ? 'Escribe tu usuario' : '';
                break;
            case 'calification':
                break;
            case 'comment':
                errors.comment = value.length < 5 ? 'Escribe minimo 10 letras' : '';
                break;
            default:
                break;
        }

        // inputs[name] = value;
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
            Swal.fire({
                icon: 'success',
                title: 'Your review was send!',
                confirmButtonText: "Close",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `/`;
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops, something went wrong',
                text: `${error}`,
                confirmButtonText: 'Try again',
            });
        }
    }

    return (
        <div className='reviewContainer'>
            <h4>Tell us how to improve</h4>

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
                <Rating
                    activeColor="#ffd700"
                    count={5}
                    size={45}
                    onChange={handleRatingChange}
                />

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
