import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VolumeControl from '../VolumeControl/VolumeControl'

import './PlayerControls.scss';

class PlayerControls extends Component {
  static propTypes = {
    config: PropTypes.object,
    onRandomToggle: PropTypes.func,
    onLoopToggle: PropTypes.func,
    onVolumeChange: PropTypes.func,
    onVolumeToggle: PropTypes.func
  }

  static defaultProps = {
    config: {},
    onRandomToggle: () => {},
    onLoopToggle: () => {},
    onVolumeChange: () => {},
    onVolumeToggle: () => {}
  }

  render() {
    const { config } = this.props;

    return (
      <div className="track-tools">
        <i className={`icon fa fa-random ${config.isRandom && 'active'}`} onClick={this.props.onRandomToggle} aria-hidden="true"></i>
        <i className={`icon fa fa-repeat ${config.isLoop && 'active'}`} onClick={this.props.onLoopToggle} aria-hidden="true"></i>
        <VolumeControl config={config} onVolumeChange={this.props.onVolumeChange} onVolumeToggle={this.props.onVolumeToggle} />
      </div>
    )
  }
}

export default PlayerControls;
