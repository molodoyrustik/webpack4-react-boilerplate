import React from 'react';
import { connect } from 'react-redux';

import { deleteDomain } from '../../../actions/domain';
import { deleteChannel } from '../../../actions/channel';

import Widget from '../common/Widget';

const DashboardContent = (props) => {
  const {
    domains,
    channels,
    deleteDomain,
    deleteChannel,
  } = props;

  return (
    <div className="dashboard-content">
      <div className="dashboard-content__domains">
        <Widget
          data={domains}
          deleteAction={deleteDomain}
          title='Domains'
          navTitle='Domain'
          navSubTitle='Response'
          href='/dashboard/domains/add-domain'
          editHref='/dashboard/domains/'
        />
      </div>
      <div className="dashboard-content__channels">
        <Widget
          data={channels}
          deleteAction={deleteChannel}
          title='Channels'
          navTitle='Name'
          navSubTitle='Type'
          href='/dashboard/channels/add-channel'
          editHref='/dashboard/channels/'
        />
      </div>
      <div className="dashboard-content__logs">
        <Widget
          data={domains}
          isLogsComponent={true}
          title='Last Logs'
          navTitle='Name'
          navSubTitle='Response'
          href=''
        />
      </div>
    </div>
  );
};

export default connect((state) => {
  return {
    domains: state.user.domains,
    channels: state.user.channels,
  };
}, { deleteDomain, deleteChannel })(DashboardContent);
