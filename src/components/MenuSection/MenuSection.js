import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuSection extends Component {
  static defaultProps = {
    header: PropTypes.oneOfType([PropTypes.string])
  }

  static propTypes = {
    header: 'Section'
  }

  render() {
    return (
      <div className="menu-row">
        <div className="menu-row-title">
          {this.props.header}
        </div>
        <div className="menu-row-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default MenuSection;
