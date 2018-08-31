import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { forgot, handleError } from '../../../../../actions';

class ForgotForm extends Component {
  state = {
    email: '',
    captcha: true,
  }

  handleInputChange = (type) => e => {
    this.setState({ [type]: e.target.value });
  }

  handleCaptchaChange = (value) => {
    if (value) {
      this.setState({ captcha: true });
    }
  }

  handleSubmit = (e) => {
    let message = '';
    if (!this.state.email) {
      message = 'Вы не ввели email';
      return this.props.handleError(message);
    }

    this.props.forgot(this.state);
  }

  render() {
    return (
      <div className="auth__form">
        <div className="auth__input-wrap">
          <input
            type='text'
            className='auth__input'
            onChange={this.handleInputChange('email')}
            value={this.state.email}
            placeholder="Email"
          />
        </div>
        <button
          onClick={this.handleSubmit}
          className='auth__submit-btn forgot__submit-btn'
        >Restore pass</button>
        <div className="forgot__links">
          <Link to="/auth/signup" className="auth__link-to-login">Don't have an account?</Link>
          <Link to="/auth/login" className="auth__link-to-login">Already have an account?</Link>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {};
}, { handleError, forgot })(ForgotForm);
