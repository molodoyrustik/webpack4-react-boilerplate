import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DomainItem extends Component {
  handleDeleteDomain = () => {
    const { deleteAction, id } = this.props;
    deleteAction({ id });
  }

  render() {
    const {
      title,
      id,
      subtitile,
      editHref,
    } = this.props;
    return (
      <li className="widget__item">
        <div className="widget__checkbox"></div>
        <span className="widget__nav-title widget__nav-title--font">{ title }</span>
        <span className="widget__nav-subtitle widget__nav-subtitle--font">{subtitile}</span>
        <span className="widget__btns">
          <Link to={`${editHref}${id}`} className="widget__edit"></Link>
          <div className="widget__delete" onClick={this.handleDeleteDomain}></div>
        </span>
      </li>
    );
  }
}

export default (DomainItem);
