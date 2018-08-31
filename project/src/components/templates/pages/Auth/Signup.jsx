import React, { Component } from 'react';

import LoginLayout from '../../layouts/login-layout.jsx';
import SignupForm from '../../sections/Signup/SignupForm';

class Signup extends Component {
  render() {
    return (
        <LoginLayout>
          <div className="auth">
            <div className="auth__block">
              <p className="auth__title">Sign Up</p>
              <SignupForm />
            </div>
          </div>
        </LoginLayout>
    );
  }
}

export default Signup;
