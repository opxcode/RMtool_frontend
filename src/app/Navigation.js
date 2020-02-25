import React, { Component } from 'react';
export default class Navigation extends Component {
  render() {
    return (
      <div>
        {/* top navigation */}
        <div className='top_nav'>
          <div className='nav_menu'>
            <div className='nav toggle'>
              <a id='menu_toggle'>
                <i className='fa fa-bars'></i>
              </a>
            </div>
            <nav className='nav navbar-nav'>
              <ul className=' navbar-right'>
                <li
                  className='nav-item dropdown open'
                  style={{ paddingLeft: 15 + 'px' }}
                >
                  <a
                    href=''
                    className='user-profile dropdown-toggle'
                    aria-haspopup='true'
                    id='navbarDropdown'
                    data-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <img src='images/img.jpg' alt='' />
                    John Doe
                  </a>
                  <div
                    className='dropdown-menu dropdown-usermenu pull-right'
                    aria-labelledby='navbarDropdown'
                  >
                    <a className='dropdown-item'> Profile</a>
                    <a className='dropdown-item'>
                      <span className='badge bg-red pull-right'></span>
                      <span>Settings</span>
                    </a>
                    <a className='dropdown-item'>Help</a>
                    <a className='dropdown-item' href='login.html'>
                      <i className='fa fa-sign-out pull-right'></i> Log Out
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* /top navigation */}
      </div>
    );
  }
}
