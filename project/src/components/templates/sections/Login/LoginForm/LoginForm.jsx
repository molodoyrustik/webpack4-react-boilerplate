import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleError, login } from '../../../../../actions';

class LoginForm extends Component {
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

    this.props.login(this.state);
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
        <div className="auth__input-wrap login__input-wrap">
          <input
            className='auth__input'
            type='password'
            onChange={this.handleInputChange('password')}
            value={this.state.password}
            placeholder="Password"
          />
        </div>
        <div className="login__forgot">
          <Link to="/auth/forgot" className="login__forgot-link">Forgot password?</Link>
        </div>
        <button
          onClick={this.handleSubmit}
          className='auth__submit-btn'
        >Log In</button>
        <div className="auth__divider">or </div>
        <button
          onClick={this.handleSubmit}
          className='auth__google-btn'
        >Log in with Google</button>
        <Link to="/auth/signup" className="auth__link-to-login">Don't have an account?</Link>
      </div>
    );
  }
}

export default connect(null, { handleError, login })(LoginForm);
