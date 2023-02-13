import PropTypes from 'prop-types';
import { ContactListItem } from './ContactListItem'
import { Filter } from '../Filter/Filter';


export const ContactList = ({ contacts, onRemove, filter, onChange }) => {
    return <>
        <h3>Contacts</h3>
        <Filter filter={filter} onChange={onChange} />
        <ul>
            {contacts.map(contact => {
                return (
                    <li key={contact.id}>
                        <ContactListItem {...contact} onRemove={onRemove} />
                    </li>
                );
            }
            )}
        </ul>
    </>
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          phone: PropTypes.string.isRequired,
        }).isRequired
      ),
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};
