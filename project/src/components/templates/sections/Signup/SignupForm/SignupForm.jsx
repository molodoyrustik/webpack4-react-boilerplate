import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleError, signup } from '../../../../../actions';

class SignupForm extends Component {
  state = {
    email: '',
    password: '',
    captcha: true,
  }

  handleInputChange = (type) => e => {
    if (type === 'email') {
      this.setState({ email: e.target.value });
    } else if (type === 'password') {
      this.setState({ password: e.target.value });
    }
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
    } else if (!this.state.password) {
      message = 'Вы не ввели пароль';
    } else if (!this.state.captcha) {
      message = 'Вы не отметили капчу';
    }

    if (message) {
      return this.props.handleError(message);
    }

    this.props.signup(this.state);
  }

  render() {
    return (
      <div className="auth__form">
        <div className="auth__input-wrap">
          <input
            className='auth__input'
            onChange={this.handleInputChange('email')}
            value={this.state.email}
            placeholder="Email Address"
          />
        </div>
        <div className="auth__input-wrap auth__input-wrap-last">
          <input
            className='auth__input'
            type='password'
            onChange={this.handleInputChange('password')}
            value={this.state.password}
            placeholder="Password"
          />
        </div>
        <button
          onClick={this.handleSubmit}
          className='auth__submit-btn'
        >Sign Up</button>
        <div className="auth__divider">or</div>
        <button
          onClick={this.handleSubmit}
          className='auth__google-btn'
        >Sign Up with Google</button>
        <Link to="/auth/login" className="auth__link-to-login">Already have an account?</Link>
      </div>
    );
  }
}

export default connect(null, { handleError, signup })(SignupForm);
