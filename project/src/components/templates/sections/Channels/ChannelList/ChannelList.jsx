import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import ChannelItem from './ChannelItem';
import { getChannels } from '../../../../../actions/channel';

class DomainList extends Component {
  componentDidMount() {
    this.props.getChannels();
  }

  render() {
    const { channels } = this.props;
    return (
      <ul className="channel-list">
        {
          channels.map((channel) => {
            return (
              <ChannelItem
                key={shortid.generate()}
                id={channel.id} type={channel.type}
                endpoint={channel.endpoint}
              />
            );
          })
        }
      </ul>
    );
  }
}

export default connect((state) => {
  return {
    channels: state.user.channels,
  };
}, { getChannels })(DomainList);
