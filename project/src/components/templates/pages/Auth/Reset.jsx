import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginLayout from '../../layouts/login-layout.jsx';
import ResetForm from '../../sections/Reset/ResetForm';

import { reset } from '../../../../actions';

class Reset extends Component {
  render() {
    return (
      <LoginLayout>
        <div className="auth">
          <div className="auth__block">
            <p className="auth__title">Reset</p>
            <ResetForm
              reset={this.props.reset}
              forgotEmailToken={this.props.forgotEmailToken}
              btnText={'Reset my password'}
            />
          </div>
        </div>
      </LoginLayout>
    );
  }
}

export default connect((state) => {
  return {
    forgotEmailToken: state.forgot.tokenModel.forgotEmailToken,
  };
}, { reset })(Reset);
