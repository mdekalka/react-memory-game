import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MenuSection.scss';

class MenuSection extends Component {
  static propTypes = {
    header: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
  }

  static defaultProps = {
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
