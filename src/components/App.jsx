import { Component } from 'react';
import contacts from '../Data/contacts.json'
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList';

const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  componentDidMount() {
    const localData =localStorage.getItem(CONTACTS_KEY)
    if (localData) this.setState({contacts: JSON.parse(localData)})
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = newContact =>
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

  handleCheckUniqueContact = name => {
    const { contacts } = this.state;

    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return !isExistContact;
  };

  handleRemoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) =>
        contact.id !== id),
    }));

    handleFilterChange = (event) => this.setState({ filter: event.target.value });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state
    const visibleContacts = this.getVisibleContacts()
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm
          onAdd={this.handleAddContact}
          onCheckUnique={this.handleCheckUniqueContact}
        />

        {contacts.length > 0 ? (
          <ContactList
            filter={filter}
            contacts={visibleContacts}
            onRemove={this.handleRemoveContact}
            onChange={this.handleFilterChange}
          />) : (<h3>No contacts</h3>)}
      </>
    );
  }
}
