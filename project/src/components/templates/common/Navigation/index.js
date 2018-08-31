import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink exact className='navigation__link' activeClassName="navigation__link--active" to='/dashboard'>Dashboard</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className='navigation__link' activeClassName="navigation__link--active" to='/dashboard/domains'>Domains</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className='navigation__link' activeClassName="navigation__link--active" to='/dashboard/channels'>Channels</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
