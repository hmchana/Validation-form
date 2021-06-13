import React, { useState } from 'react';

const initStateForm = {
  name: '',
  email: '',
  password: ''
};

const initStateErrors = {
  nameError: '',
  emailError: '',
  passwordError: ''
};

const ValidationForm = () => {
  const [form, setForm] = useState(initStateForm);

  const [errors, setErrors] = useState(initStateErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validate = () => {
    let nameError = '';
    let emailError = '';
    if (!form.name) {
      nameError = 'name cannot be blank';
    }

    if (!form.email.includes('@')) {
      emailError = 'invalid email';
    }

    if (emailError || nameError) {
      setErrors({
        emailError,
        nameError
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    const isValid = validate();
    if (isValid) {
      console.log(form);
      //clear form
      setErrors(initStateErrors);
    }
  };
  const { name, email, password } = form;
  const { nameError, emailError, passwordError } = errors;
  return (
    <div>
      <div>
        <input
          placeholder='name'
          name='name'
          value={name}
          type='text'
          onChange={handleChange}
        />
        <div style={{ color: 'red', fontSize: '12px' }}>{nameError}</div>
      </div>

      <div>
        <input
          placeholder='email'
          name='email'
          value={email}
          type='text'
          onChange={handleChange}
        />
        <div style={{ color: 'red', fontSize: '12px' }}>{emailError}</div>
      </div>

      <div>
        <input
          placeholder='password'
          name='password'
          value={password}
          type='password'
          onChange={handleChange}
        />
        <div style={{ color: 'red', fontSize: '12px' }}>{passwordError}</div>
      </div>

      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ValidationForm;
