import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BoardImageSection.scss';

class BoardSizeSection extends Component {
  static propTypes = {
    list: PropTypes.array,
    options: PropTypes.object,
    cardKeys: PropTypes.array,
    onImageSelect: PropTypes.func,
    errors: PropTypes.object
  }

  static defaultProps = {
    list: [],
    options: {},
    cardKeys: [],
    onImageSelect: () => {},
    errors: {}
  }

  render() {
    const { options, list, cardKeys, errors } = this.props;

    return (
      <div className="image-section">
        <ul className="image-list">
          {list.map(imageItem => (
            <li
              key={imageItem.key}
              onClick={() => this.props.onImageSelect(imageItem)}
              className={`image-item pointer ${imageItem.selected ? 'selected' : ''}`} >
              <i className="fa fa-check-circle-o" aria-hidden="true"></i>
              <img className="image-picture" src={imageItem.image} alt="cell preview" />
            </li>
          ))}
        </ul>
        {
          errors.invalidImageCount &&
          <div className="error-message">
            You should chose atleast {options.size / 2 - cardKeys.length} image(s) for this board size.
          </div>
        }
      </div>
    )
  }
}

export default BoardSizeSection;