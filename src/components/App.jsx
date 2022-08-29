import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// import initialContacts from '../contacts.json';

import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.find(
        contact =>
          (contact.name.toLowerCase() === name.toLowerCase() &&
            contact.number === number) ||
          contact.number === number
      )
    ) {
      alert(`${name} with ${number} is already in contacts`);
      return;
    }

    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilterInput = e => {
    setFilter(e.currentTarget.value);
  };

  // const normalizedFilter = filter.toLocaleLowerCase();
  // const findContacts = contacts.filter(contact =>
  //   contact.name.includes(filter)
  // );

  // contacts?.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );
  const findContacts = contacts?.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <section>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilterInput={changeFilterInput} />
        <ContactList contacts={findContacts} deleteContact={deleteContact} />
      </div>
    </section>
  );
};
