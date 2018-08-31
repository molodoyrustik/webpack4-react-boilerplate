import React from 'react';

import Btn from '../common/Btn';

import DomainsNav from '../sections/Domains/DomainsNav';
import DomainList from '../sections/Domains/DomainList';

const Domains = (props) => {
  return (
    <div className="domains">
      <h2 className="domains__title">List of Domains</h2>
      <div className="domains__content">
        <DomainsNav/>
        <DomainList/>
      </div>
      <Btn href='/dashboard/domains/add-domain' text='Add new' type='blue'/>
    </div>
  );
};

export default Domains;
