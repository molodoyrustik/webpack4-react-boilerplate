import React from 'react';
import { Link } from 'react-router-dom';

const CreateNewBtn = (props) => {
  const { href, type, text } = props;

  return (
    <Link to={href} className={`create-new-btn create-new-btn--${type}`}>
      {text}
    </Link>
  );
};

export default CreateNewBtn;
