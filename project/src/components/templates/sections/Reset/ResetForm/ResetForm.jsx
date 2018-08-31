import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleError, reset } from '../../../../../actions';

class ResetForm extends Component {
  state = {
    password: '',
    checkPassword: '',
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
    if (!this.state.password) {
      message = 'Вы не ввели пароль';
    } else if (!this.state.checkPassword) {
      message = 'Вы не ввели повторный пароль';
    } else if (!this.state.captcha) {
      message = 'Вы не отметили капчу';
    }
    if (message) {
      return this.props.handleError(message);
    }

    const { forgotEmailToken } = this.props;
    this.props.reset({
      ...this.state,
      forgotEmailToken,
    });
  }

  render() {
    return (
      <div className="auth__form">
        <div className="auth__input-wrap">
          <input
            className='auth__input'
            type='password'
            onChange={this.handleInputChange('password')}
            value={this.state.password}
            placeholder="Password"
          />
        </div>
        <div className="auth__input-wrap">
          <input
            className='auth__input'
            type='password'
            onChange={this.handleInputChange('checkPassword')}
            value={this.state.checkPassword}
            placeholder="Repeat password"
          />
        </div>
        <button
          onClick={this.handleSubmit}
          className='auth__submit-btn'
        >Reset my password</button>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    forgotEmailToken: state.forgot.tokenModel.forgotEmailToken,
  };
}, { handleError, reset })(ResetForm);
