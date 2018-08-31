import React from 'react';

const DomainsNav = (props) => {
  return (
    <nav className="domains__nav">
      <div className="domains__checkbox"></div>
      <div className="domains__nav-title domains__nav-title--ml">Domains</div>
      <div className="domains__nav-title">Response</div>
      <div className="domains__nav-title">Date</div>
      <div className="domains__nav-title">Time</div>
      <div className="domains__nav-title">Errors</div>
      <div className="domains__btns">
        <span className="domains__edit" />
        <span className="domains__delete" />
      </div>
    </nav>
  );
};

export default DomainsNav;
