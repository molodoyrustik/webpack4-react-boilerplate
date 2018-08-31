import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleError } from '../../../actions';
import { addDomain } from '../../../actions/domain';

import ValidationHoc from '../../HOC/ValidationHoc';
import Btn from '../common/Btn';
import DomainAddInputGroup from '../sections/DomainAdd/DomainAddInputGroup';
import DomainAddChannelList from '../sections/DomainAdd/DomainAddChannelList';
import DomainAddProxyList from '../sections/DomainAdd/DomainAddProxyList';

class DomainAdd extends Component {
  state = {
    url: '',
    channels: '',
    proxy: '',
    timeout: '',
  }

  handleUrlChange = (e) => {
    this.setState({ url: e.target.value });
  }

  handleChannelChange = (channelId) => (e) => {
    this.setState({ channels: channelId });
  }

  handleProxyChange = (proxyId) => (e) => {
    this.setState({ proxy: proxyId });
  }

  handleTimeoutChange = (timeoutId) => (e) => {
    this.setState({ timeout: e.target.value });
  }

  handleCreateDomain = (e) => {
    e.preventDefault();
    if (!this.state.url) {
      this.props.handleError('Вы не ввели домен');
      return 0;
    } else if (!this.state.channels) {
      this.props.handleError('Вы не выбрали канал');
      return 0;
    } else if (!this.state.proxy) {
      this.props.handleError('Вы не выбрали прокси');
      return 0;
    } else if (!this.state.timeout) {
      this.props.handleError('Вы не выбрали таймаут');
      return 0;
    }
    this.props.addDomain(this.state);
  }

  render() {
    return (
      <ValidationHoc>
        <div className="domain-add">
          <h2 className="domain-add__title">Add Domain</h2>
          <DomainAddInputGroup title='Url' subtitle='Address of your domain'>
            <input
              type="text"
              className="domain-add__input"
              placeholder='Name of domain'
              value={this.state.url}
              onChange={this.handleUrlChange}
            />
          </DomainAddInputGroup>

          <DomainAddInputGroup title='Channel' subtitle='For receiving notifications'>
            <DomainAddChannelList onChannelChange={this.handleChannelChange} />
          </DomainAddInputGroup>

          <DomainAddInputGroup title='Ping from' subtitle='Select locations'>
            <DomainAddProxyList onProxyChange={this.handleProxyChange} />
          </DomainAddInputGroup>

          <DomainAddInputGroup title='Settings' subtitle='Additional settings'>
            <select name="" id="" onChange={this.handleTimeoutChange('1')} className='domain-add__select'>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
            </select>
          </DomainAddInputGroup>
          <div className="domain-add__btns">
            <Btn href='/dashboard/domains/' text='Back to List' type='grey'/>
            <div className="domain-add__create-btn-pos">
              <Btn href='/fsdf' text='Create' type='blue' onClick={this.handleCreateDomain}/>
            </div>
          </div>
        </div>
      </ValidationHoc>
    );
  }
}

export default connect(null, { handleError, addDomain })(DomainAdd);
