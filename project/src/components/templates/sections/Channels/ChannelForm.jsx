import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Checkbox, Icon, Button, Intent } from '@blueprintjs/core';
import { addChannel } from '../../../../actions/channel';
import { handleError, handleMessage } from '../../../../actions';

class ChannelForm extends Component {
  state = {
    endpoint: '',
    telegram: false,
    sms: false,
    email: false,
  }

  handleAdd = () => {
    const { endpoint, email } = this.state;

    if (!endpoint) {
      return this.props.handleError('Заполните все поля');
    }
    if (!email) {
      return this.props.handleError('Выберите тип');
    }
    let type = '';
    if (email) {
      type = 'email';
    }

    this.props.addChannel({ endpoint, type });
    this.setState({ endpoint: '', type: '' });
  }

  handleChange = type => (e) => {
    const { value } = e.target;

    this.setState({ [type]: value });
  }

  handleEnabledChange = type => (e) => {
    this.setState({ telegram: false, sms: false, email: false });
    this.setState({ [type]: !this.state[type] });
  }
  render() {
    return (
      <div className="channel-form">
        <ul className="channel-form__list">
          <li className="channel-form__item">
            <h3 className="channel-form__item-title">Endpoint</h3>
            <p className="channel-form__item-subtitle">Enter endpoint</p>
            <input type="text" placeholder='endpoint' value={this.state.endpoint} onChange={this.handleChange('endpoint')}/>
          </li>
          <li className="channel-form__item">
            <h3 className="channel-form__item-title">Type</h3>
            <p className="channel-form__item-subtitle">Choose type for channel</p>
            <Checkbox checked={this.state.email} onChange={this.handleEnabledChange('email')}>
              <Icon icon="envelope" />
              <strong>Email</strong>
            </Checkbox>
            <Checkbox disabled={true} checked={this.state.sms} onChange={this.handleEnabledChange('sms')}>
              <Icon icon="phone" />
              <strong>Sms</strong>
            </Checkbox>
            <Checkbox disabled={true} checked={this.state.telegram} onChange={this.handleEnabledChange('telegram')}>
              <Icon icon="inbox" />
              <strong>Telegram</strong>
            </Checkbox>
          </li>
          <Button
            className='channel-form__btn-add'
            intent={Intent.SUCCESS}
            large={true}
            onClick={this.handleAdd}
            text="Add"
          />
        </ul>
      </div>
    );
  }
}

export default connect(null, { addChannel, handleError })(ChannelForm);
