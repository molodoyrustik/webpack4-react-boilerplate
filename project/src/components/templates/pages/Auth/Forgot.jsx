import React, { Component } from 'react';

import LoginLayout from '../../layouts/login-layout.jsx';
import ForgotForm from '../../sections/Forgot/ForgotForm';

class Forgot extends Component {
  render() {
    return (
      <LoginLayout>
        <div className="auth forgot">
          <div className="auth__block">
            <p className="auth__title">Restore pass</p>
            <ForgotForm />
          </div>
        </div>
      </LoginLayout>
    );
  }
}

export default Forgot;
