import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '@blueprintjs/core';

import LoginLayout from '../../layouts/login-layout.jsx';

import { checkForgotToken } from '../../../../actions';

class CheckForgotToken extends Component {
  componentWillMount() {
    const data = {
      forgotEmailToken: this.props.match.params.id,
    };
    this.props.checkForgotToken(data);
  }

  render() {
    return (
      <LoginLayout>
        <div className='signup'>
          <div className='signup__block'>
            <div className='check-forgot-token'>
              <Spinner
                size={160}
                intent='success'
              />
            </div>
          </div>
        </div>
      </LoginLayout>
    );
  }
}

export default connect((state) => {
  return {
    forgot: state.forgot.forgot,
  };
}, { checkForgotToken })(CheckForgotToken);
