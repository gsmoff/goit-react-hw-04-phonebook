import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useState } from 'react';


export const ContactForm = ({onAdd,onCheckUnique}) => {
  
  const [name, setName]=useState('')
  const [phone, setPhone]=useState('')
  
  const handleCangeForm = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'phone') setPhone(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValidateForm = validateForm();

    if (!isValidateForm) return;

    onAdd({ id: nanoid(), name, phone });

    resetForm();
  };
  const validateForm = () => {
    if (!name || !phone) {
      alert('Some filed is empty');
      return false
    }
    return onCheckUnique(name);
  };

  const resetForm = () => {
    setName('')
    setPhone('')
  }


    return (
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleCangeForm}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={handleCangeForm}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }


ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCheckUnique: PropTypes.func.isRequired,
};
