import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BoardImageSection.scss';

class BoardSizeSection extends Component {
  static propTypes = {
    list: PropTypes.array,
    onImageSelect: PropTypes.func,
    errors: PropTypes.object
  }

  static defaultProps = {
    list: [],
    onImageSelect: () => {},
    errors: {}
  }

  render() {
    return (
      <div>
        <ul className="image-list">
          {this.props.list.map(imageItem => (
            <li
            key={imageItem.key}
            onClick={() => this.props.onImageSelect(imageItem)}
            className={`image-item pointer ${imageItem.selected ? 'selected' : ''}`} >
              <i className="fa fa-check-circle-o" aria-hidden="true"></i>
              <img className="image-picture" src={imageItem.image} alt="cell preview" />
            </li>
          ))}
        </ul>
        <div className="notification-message error">{this.props.errors.invalidImageCount}</div>
      </div>
    )
  }
}

export default BoardSizeSection;