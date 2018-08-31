import React from 'react';

const LogItem = (props) => {
  const { domain } = props;
  return (
    <li className="widget__item">
      <div className="widget__checkbox"></div>
      <span className="widget__nav-title widget__nav-title--font">{ domain }</span>
      <span className="widget__nav-subtitle widget__nav-subtitle--font widget__nav-subtitle--logs">200OK</span>
      <span className="widget__nav-subtitle widget__nav-subtitle--font widget__nav-subtitle--logs">28.01.2020</span>
      <span className="widget__nav-subtitle widget__nav-subtitle--font widget__nav-subtitle--logs">20:20</span>
    </li>
  );
};

export default LogItem;
