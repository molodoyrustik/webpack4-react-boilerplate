import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Btn extends Component {
  render() {
    const {
      href,
      type,
      text,
      onClick,
    } = this.props;

    return (
      <Link to={href} className={`btn--${type}`} onClick={onClick}>
        {text}
      </Link>
    );
  }
}

export default Btn;
