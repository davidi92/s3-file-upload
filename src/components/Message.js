import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg, type }) => {
  return (
    <div className={`alert alert-${type}`} role="alert ">
      {msg}
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Message;
