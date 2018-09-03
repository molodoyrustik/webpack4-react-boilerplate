import React, { Component } from 'react';
import shortid from 'shortid';

import DomainAddProxyItem from './DomainAddProxyItem';
import CreateNewBtn from '../../common/CreateNewBtn';

const proxies = [
  {
    id: 1,
    country: 'Frankfurt',
    ip: '',
  },
  {
    id: 2,
    country: 'London',
    ip: '',
  },
  {
    id: 3,
    country: 'Moscow',
    ip: '',
  },
];

class DomainAddProxyList extends Component {
  state = {
    activeItem: '',
  }

  handleClick = (proxy) => (e) => {
    const { onProxyChange } = this.props;
    onProxyChange(proxy.id)(proxy.id);
    this.setState({ activeItem: proxy.id });
  }

  render() {
    return (
      <ul className="domain-add__proxy-list">
        {
          proxies.map((proxy) => {
            return <DomainAddProxyItem
                      key={shortid.generate()}
                      isActive={this.state.activeItem === proxy.id}
                      onProxyChange={this.handleClick(proxy)}
                      country={proxy.country}
                      proxyId={proxy.id}
                  />;
          })
        }
        <CreateNewBtn href='/dashboard/proxies/add-proxy' type='dark' text='Add personal Proxy'/>
      </ul>
    );
  }
}

export default DomainAddProxyList;
