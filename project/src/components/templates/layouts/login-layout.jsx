import React from 'react';

import ValidationHoc from '../../HOC/ValidationHoc';

const LoginLayout = (props) => {
  const { children } = props;
  return (
    <div className='login-layout'>
      <div className='login-layout__wrapper'>
        <div className="login-layout__left">
          <div className="login-logo login-layout__logo">
            <p className="login-logo__text login-layout__logo-text">ashile.</p>
          </div>
          <div className="login-footer login-layout__left-footer">
            <span className="login-footer__text login-layout__left-footer-text">
              Privacy Policy
            </span>
            <span className="login-footer__text login-layout__left-footer-text">
              User agreement
            </span>
          </div>
        </div>
        <div className="login-layout__right"></div>
        <ValidationHoc>
          {children}
        </ValidationHoc>
      </div>
    </div>
  );
};

export default LoginLayout;
