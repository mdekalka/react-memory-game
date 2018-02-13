import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BoardSizeSection.scss';

class BoardSizeSection extends Component {
  static propTypes = {
    size: PropTypes.number,
    sizes: PropTypes.object,
    onSizeItemClick: PropTypes.func
  }

  static defaultProps = {
    size: null,
    sizes: {},
    onSizeItemClick: () => {}
  }

  render() {
    const sizes = Object.keys(this.props.sizes)

    return (
      <ul className="size-list">
        {sizes.map(sizeKey => (
          <li className={`size-list-row ${sizeKey}`} key={sizeKey}>
            <div className="size-title" >{sizeKey} board:</div>
            {this.props.sizes[sizeKey].map(size => (
              <div
                key={size}
                onClick={() => this.props.onSizeItemClick(size)}
                className={`size-item pointer ${size === this.props.size ? 'active': ''}`} >
                {size}
              </div>
            ))}
          </li>
        ))}
      </ul>
    )
  }
}

export default BoardSizeSection;
