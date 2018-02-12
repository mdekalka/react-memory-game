import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

import './VolumeControl.scss';

class VolumeControl extends Component {
  static propTypes = {
    config: PropTypes.object,
    onVolumeChange: PropTypes.func,
    onVolumeToggle: PropTypes.func
  }

  static defaultProps = {
    config: {},
    onVolumeChange: () => {},
    onVolumeToggle: () => {}
  }

  render() {
    const { config } = this.props;

    return (
      <div className="volume-control">
        <div className="volume-control-slider">
          <Slider vertical min={0} max={100} value={config.isMuted ? 0 : config.volumeLevel} onChange={this.props.onVolumeChange} />
        </div>
        <i className={`icon fa-fw fa fa-volume-${config.isMuted ? 'off' : 'up'}`} onClick={this.props.onVolumeToggle} aria-hidden="true"></i>
      </div>
    )
  }
}

export default VolumeControl;
