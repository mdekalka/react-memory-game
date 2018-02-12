import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import moment from 'moment';
import momentDurationFormatSetup  from 'moment-duration-format'

import './ProgressControl.scss';

momentDurationFormatSetup(moment)
const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

class ProgressControl extends Component {
  static propTypes = {
    config: PropTypes.object,
    onSeekMouseDown: PropTypes.func,
    onSeekChange: PropTypes.func,
    onSeekMouseUp: PropTypes.func
  }

  static defaultProps = {
    config: {},
    onSeekMouseDown: () => {},
    onSeekChange: () => {},
    onSeekMouseUp: () => {}
  }

  formatTime(time) {
    return moment.duration(time, 'seconds').format('m:ss', {
      trim: false
    });
  }

  render() {
    const { config } = this.props;

    return (
      <div className="track-progress-control">
        <div className="track-progress-time">
          <time>{this.formatTime(config.duration * config.played)}</time>
          <time>{!!config.duration && this.formatTime(config.duration)}</time>
        </div>
        <SliderWithTooltip
          className="track-progress-seek"
          min={0}
          max={100}
          value={Math.round(config.played * 100)}
          tipFormatter={() => this.formatTime(config.duration * config.played)}
          width={'100%'}
          onBeforeChange={this.props.onSeekMouseDown}
          onChange={this.props.onSeekChange}
          onAfterChange={this.props.onSeekMouseUp} />
      </div>
    )
  }
}

export default ProgressControl;
