import { useState, useEffect } from 'react';
import Contacts from '../Data/contacts.json';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
      JSON.parse(localStorage.getItem(CONTACTS_KEY)) ??
      Contacts
  );
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    // console.log('useEffect start!')
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleCheckUniqueContact = name => {
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return !isExistContact;
  };

  const handleRemoveContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm
        onAdd={handleAddContact}
        onCheckUnique={handleCheckUniqueContact}
      />

      {contacts.length > 0 ? (
        <ContactList
          filter={filter}
          contacts={visibleContacts}
          onRemove={handleRemoveContact}
          onChange={handleFilterChange}
        />
      ) : (
        <h3>No contacts</h3>
      )}
    </>
  );
};
