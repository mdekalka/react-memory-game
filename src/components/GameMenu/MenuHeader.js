import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';

class MenuHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    withTooltip: PropTypes.object
  }

  static defaultProps = {
    title: '',
    icon: '',
    withTooltip: null
  }

  render() {
    return (
      <div className="menu-row-title">
        {this.props.icon && <i className={`fa ${this.props.icon}`} aria-hidden="true"></i>}
        {this.props.withTooltip ?
          <Tooltip title="Welcome to React" animation="none" animateFill={false} duration={0} position="bottom">
            <i className="fa fa-fw fa-th-large" aria-hidden="true"></i>
            Board items count:
          </Tooltip> : null
        }
        {this.props.title}
      </div>
    )
  }
}

export default MenuHeader;
