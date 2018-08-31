import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function IndexRedirect(props) {
  if (!props.auth) {
    return <Redirect to='/dashboard/'/>;
  } else {
    return <Redirect to='/auth/login' />;
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default connect(mapStateToProps)(IndexRedirect);
