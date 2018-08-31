import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import DomainItem from './DomainItem';

const DomainList = (props) => {
  return (
    <ul className="domains__list">
      {
        props.domains.map((domain) => {
          return <DomainItem key={shortid.generate()} domain={domain.url} domainId={domain.id}/>;
        })
      }
    </ul>
  );
};

export default connect((state) => {
  return {
    domains: state.user.domains,
  };
}, {})(DomainList);
