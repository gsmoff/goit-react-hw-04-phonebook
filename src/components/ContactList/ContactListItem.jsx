import PropTypes from 'prop-types';
export const ContactListItem = ({ id, name, phone, onRemove }) => {
  return <>
    {name}: {phone} <button onClick={() => { onRemove(id) }}>delete</button>
  </>
}

ContactListItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired
  ),
  onRemove: PropTypes.func.isRequired,
};