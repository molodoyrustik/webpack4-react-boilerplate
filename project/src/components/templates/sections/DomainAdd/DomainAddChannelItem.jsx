import React from 'react';

const DomainAddChannelItem = (props) => {
  const {
    type,
    endpoint,
    onChannelChange,
    isActive,
  } = props;
  const activeClassName = isActive ? `domain-add__channel-item--active domain-add__channel-item-${type}--active` : null;

  return (
    <li onClick={onChannelChange} className={`domain-add__channel-item domain-add__channel-item--${type} ${activeClassName}`}>
      {endpoint}
    </li>
  );
};

export default DomainAddChannelItem;
