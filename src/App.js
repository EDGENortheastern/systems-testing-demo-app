import { useState } from 'react';
import './App.css';
import validator from 'validator';

function App() {

  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setSignupInput({
      ...signupInput,
      [event.target.name]: event.target.value
    })
  }

  const handleClick = (event) => {
    event.preventDefault();
    if(!validator.isEmail(signupInput.email)){
      return setError("Invalid email");
    } else if (signupInput.password.length < 5){
      return setError("The password should be longer than 4 characters");
    } else if (signupInput.password !== signupInput.confirmPassword){
      return setError("The password does not match. Try again");
    }
  }

  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className='form-control'
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className='form-control'
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirm-pass' className='form-label'>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-pass"
            name="confirmPassword"
            className='form-control'
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button
          type='submit'
          className='btn btn-primary'
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
