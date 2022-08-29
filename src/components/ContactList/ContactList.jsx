import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import css from './ContactList.module.css';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <p>
            {name}: {number}
            <button
              className={css.listDeleteButton}
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </p>
        </li>
      ))}
    </ul>
  );
};

// export default ContactList;

// ContactList.propTypes = {
//   contacts: PropTypes.array,
//   id: PropTypes.string,
//   name: PropTypes.string,
//   number: PropTypes.string,
//   deleteContact: PropTypes.func,
// };
