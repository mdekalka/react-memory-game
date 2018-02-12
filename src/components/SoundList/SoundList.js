import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SoundList.scss';

class SoundList extends Component {
  static propTypes = {
    config: PropTypes.object,
    list: PropTypes.array,
    onHandleTrack: PropTypes.func
  }

  static defaultProps = {
    config: {},
    list: [],
    onHandleTrack: () => {}
  }

  isActiveTrack(soundContent) {
    const { activeTrack } = this.props.config;

    return activeTrack && activeTrack.id === soundContent.id;
  }

  render() {
    return (
      <ul className="sound-list">
        {this.props.list.map(soundContent => (
          <li
            key={soundContent.id}
            className={`sound-item pointer ${this.isActiveTrack(soundContent) ? 'active' : ''}`}
            onClick={() => this.props.onHandleTrack(soundContent)}>
            <i className={`icon fa fa-fw fa-${this.props.config.isPlaying && this.isActiveTrack(soundContent) ? 'pause' : 'play'}`} aria-hidden="true"></i>
            <span className="track-name">{soundContent.name}</span>
          </li>
        ))}
      </ul>
    )
  }
}

export default SoundList;
