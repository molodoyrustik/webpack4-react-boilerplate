import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Position, Toaster, Intent } from '@blueprintjs/core';

import { cleanMessage } from '../../actions';

class ValidationHoc extends Component {
  static toaster = Toaster;

  componentWillReceiveProps(props) {
    const { message, messageType } = props;
    const intent = messageType === 'error' ? Intent.DANGER : Intent.SUCCESS;

    if (message) {
      this.handleAddToast({
        intent,
        message,
        timeout: 3000,
        iconName: messageType === 'success' ? 'tick' : 'error',
      });
      this.props.cleanMessage();
    }
  }

  handleAddToast(toast) {
    this.toaster.show(toast);
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <Toaster position={Position.BOTTOM_LEFT} ref={(ref) => this.toaster = ref} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message, messageType } = state.page;

  return { message, messageType };
}

export default connect(mapStateToProps, { cleanMessage })(ValidationHoc);
