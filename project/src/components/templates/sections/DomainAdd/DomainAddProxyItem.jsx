import React from 'react';

const DomainAddProxyItem = (props) => {
  const {
    isActive,
    country,
    proxyId,
    onProxyChange,
  } = props;
  const activeClassName = isActive ? 'domain-add__proxy-item--active' : null;

  return (
    <li onClick={onProxyChange} className={`domain-add__proxy-item ${activeClassName}`}>
      {country}
    </li>
  );
};

export default DomainAddProxyItem;
