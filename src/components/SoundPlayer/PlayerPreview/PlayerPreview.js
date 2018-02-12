import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

import './PlayerPreview.scss';

class Player extends Component {
  static propTypes = {
    config: PropTypes.object,
    tools: PropTypes.element,
    onHandleTrack: PropTypes.func,
    onTrackMove: PropTypes.func
  }

  static defaultProps = {
    config: {},
    tools: null,
    onHandleTrack: () => {},
    onTrackMove: () => {}
  }

  render() {
    const { config } = this.props;

    return (
      <div className="track-info">
        <img className="track-icon" src={config.activeTrack.icon} alt='track preview icon' />
        <div className="track-play-controls">
          <i
            className={`icon fa fa-fw fa-${config.isPlaying ? 'pause' : 'play'}`}
            onClick={() => this.props.onHandleTrack(config.activeTrack)}
            aria-hidden="true">
          </i>
          <i className="icon fa fa-step-backward" onClick={() => this.props.onTrackMove()} aria-hidden="true"></i>
          <i className="icon fa fa-step-forward" onClick={() => this.props.onTrackMove(true)} aria-hidden="true"></i>
        </div>
        <div className="track-title ellipsis">{config.activeTrack.name}</div>
        {this.props.tools}
      </div>
    )
  }
}

export default Player;
