import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import DomainAddChannelItem from './DomainAddChannelItem';
import CreateNewBtn from '../../common/CreateNewBtn';

class DomainAddChannelList extends Component {
  state = {
    activeItem: '',
  };

  handleChange = (channel) => (e) => {
    const { onChannelChange } = this.props;
    onChannelChange(channel.id)(channel.id);
    this.setState({ activeItem: channel.id });
  }

  render() {
    const { channels } = this.props;
    return (
      <ul className="domain-add__channel-list">
        {
          channels.map((channel) => {
            return <DomainAddChannelItem
                    key={shortid.generate()}
                    isActive={this.state.activeItem === channel.id}
                    onChannelChange={this.handleChange(channel)}
                    type={channel.type} channelId={channel.id}
                    endpoint={channel.endpoint}
                  />;
          })
        }
        <CreateNewBtn href='/dashboard/channels/add-channel' type='white' text='Create new'/>
      </ul>
    );
  }
}

export default connect((state) => {
  return {
    channels: state.user.channels,
  };
})(DomainAddChannelList);
