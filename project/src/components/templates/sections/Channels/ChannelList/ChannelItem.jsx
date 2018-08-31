import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dialog, Intent, Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { deleteChannel } from '../../../../../actions/channel';

class ChannelItem extends Component {
  handleEdit = (e) => {
    console.log('push to channel/edit', this.props.id);
  }

  handleDelete = (e) => {
    this.props.deleteChannel({ id: this.props.id });
  }

  render() {
    const { type, endpoint, id } = this.props;
    return (
      <li className="channel__item" onClick={this.handleClick}>
        <Link className='channel__link' to={`/dashboard/channels/${id}`}>
          {type}
        </Link>
        <div className="channel__item-status">{endpoint}</div>
        <div className="channel-itme__btns">
          <Button
            intent={Intent.PRIMARY}
            onClick={this.handleEdit}
            text="Изменить"
          />
          <Button
            intent={Intent.DANGER}
            onClick={this.handleDelete}
            text="Удалить"
          />
        </div>
      </li>
    );
  }
}

export default connect(null, { deleteChannel })(ChannelItem);
