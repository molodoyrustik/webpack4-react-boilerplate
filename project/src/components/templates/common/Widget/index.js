import React, { Component } from 'react';
import shortid from 'shortid';

import DomainItem from './DomainItem';
import LogItem from './LogItem';

import Btn from '../Btn';

class Widget extends Component {
  state = {
    marginTop: 0,
  }

  getNav() {
    const {
      navTitle,
      navSubTitle,
      isLogsComponent,
    } = this.props;

    let template = '';

    if (!isLogsComponent) {
      template = (
        <div className="widget__nav">
          <div className="widget__checkbox"></div>
          <span className='widget__nav-title' >{ navTitle }</span>
          <span className='widget__nav-subtitle'>{ navSubTitle }</span>
          <div className="widget__btns">
            <span className="widget__edit"></span>
            <span className="widget__delete"></span>
          </div>
        </div>
      );
    } else {
      template = (
        <div className="widget__nav">
          <div className="widget__checkbox"></div>
          <span className='widget__nav-title' >{ navTitle }</span>
          <span className='widget__nav-subtitle widget__nav-subtitle--logs'>{ navSubTitle }</span>
          <span className='widget__nav-date' >Date</span>
          <span className='widget__nav-time'>Time</span>
        </div>
      );
    }

    return template;
  }

  getItems() {
    const {
      isLogsComponent,
      data,
    } = this.props;

    if (isLogsComponent) {
      return (
        <div>
          {
            data.map((domain) => {
              return <LogItem key={shortid.generate()} domain={domain.url} lastResponseCode={'200OK'}/>;
            })
          }
        </div>
      );
    } else {
      const { deleteAction } = this.props;
      return (
        <div>
          {
            data.map((domain) => {
              return (
                <DomainItem
                  deleteAction={deleteAction}
                  key={shortid.generate()}
                  title={domain.url || domain.endpoint}
                  id={domain.id}
                  subtitile={domain.type || '200OK'}
                  editHref={this.props.editHref}
                />
              );
            })
          }
        </div>
      );
    }
  }

  getPaginationItems() {
    const { data } = this.props;
    const pageCount = Math.ceil(data.length / 3);

    return (
      <div>
        {
          data.map((domain, index) => {
            let template = null;
            if (index + 1 <= pageCount) {
              template = <li key={shortid.generate()} className='widget__pagination-item' onClick={this.handlePaginationItem}>{index + 1}</li>;
            }
            return template;
          })
        }
      </div>
    );
  }

  handlePaginationItem = (e) => {
    const count = e.target.textContent;
    this.setState({ marginTop: (-165 * (count - 1)) + 'px' });
  }

  render() {
    const {
      title,
      isLogsComponent,
      href,
    } = this.props;

    return (
      <div className="widget">
        <h3 className="widget__title">{ title }</h3>
        <div className="widget__pages">
          { this.getNav() }
          <div className="widget__display">
            <ul className="widget__list" style={{ marginTop: this.state.marginTop }}>
              { this.getItems() }
            </ul>
          </div>
        </div>
        <div className="widget__footer">
          {
            isLogsComponent ? '' : <Btn href={href} text='Add new' type='blue'/>

          }
          <div className="widget__pagination">
            <ul className="widget__pagination-list">
              { this.getPaginationItems() }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default (Widget);
