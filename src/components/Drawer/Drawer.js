import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Drawer.scss';

class Drawer extends Component {
  static propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    onMenuToggle: PropTypes.func
  }

  static defaultProps = {
    open: false,
    title: 'Back',
    onMenuToggle: () => {}
  }

  render() {
    return (
      <div className={`drawer-container ${this.props.open ? 'open' : ''}`}>
        <div className="drawer-content">
          <div className="menu-row-title nav-btn pointer" onClick={this.props.onMenuToggle}>
            <i className="fa fa-angle-double-left" aria-hidden="true"></i>
            {this.props.title}
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Drawer;
