import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { editDomain, deleteDomain } from '../../../../../actions/domain';

class DomainItem extends Component {
  handleEdit = (e) => {
    console.log('push to domain/edit', this.props.domainId);
  }

  handleDelete = (e) => {
    this.props.deleteDomain({ domainId: this.props.domainId });
  }

  render() {
    const { domain } = this.props;
    return (
      <li className="domains__item">
        <div className="domains__checkbox"></div>
        <div className="domains__item-title domains__item-title--ml domains__item-title--font">{domain}</div>
        <div className="domains__item-title">200OK</div>
        <div className="domains__item-title">28.01.2020</div>
        <div className="domains__item-title">20:20</div>
        <div className="domains__item-title">100 Errors</div>
        <div className="domains__btns">
          <Link to='/dashboard/domains/edit' className="domains__edit" />
          <span className="domains__delete" onClick={this.handleDelete}/>
        </div>
      </li>
    );
  }
}

export default connect(null, { editDomain, deleteDomain })(DomainItem);
