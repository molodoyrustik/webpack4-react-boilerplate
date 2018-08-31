import React from 'react';

const DomainAddInputGroup = (props) => {
  const { title, subtitle, children } = props;
  return (
    <div className="domain-add__input-group">
      <h4 className="domain-add__input-title">{ title }</h4>
      <h4 className="domain-add__input-subtitle">{ subtitle }</h4>
      {
        children
      }
    </div>
  );
};


export default DomainAddInputGroup;
