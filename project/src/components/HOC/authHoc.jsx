import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function (OriginalComponent) {
  class Authentication extends Component {
    render() {
      if (!this.props.auth) {
        return <Redirect to='/auth/login'/>;
      }
      return (<OriginalComponent {...this.props} {...this.state}/>);
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
