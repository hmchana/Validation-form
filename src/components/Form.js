import React, { useState } from 'react';

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    favoritePet: '',
    rememberMe: false,
    title: ''
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setForm({
      ...form,
      [name]: rememberMe ? checked : value
    });
  };

  const handleSubmit = (e) => {
    console.log(form);
  };
  const { name, favoritePet, rememberMe, title } = form;
  return (
    <div>
      <input name='name' value={name} type='text' onChange={handleChange} />
      <textarea
        name='favoritePet'
        value={favoritePet}
        type='text'
        onChange={handleChange}
      />
      <input
        name='rememberMe'
        type='checkbox'
        checked={rememberMe}
        onChange={handleChange}
      />
      <div>
        <select name='title' value={title} onChange={handleChange}>
          <option>Mr.</option>
          <option>Miss.</option>
          <option>Ms.</option>
          <option>Mrs.</option>
        </select>
      </div>
      <button type='submit' onClick={handleSubmit}>
        {' '}
        Submit{' '}
      </button>
    </div>
  );
};

export default Form;
