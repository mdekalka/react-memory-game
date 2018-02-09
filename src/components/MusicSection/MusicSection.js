import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

import './MusicSection.scss';

const Handle = Slider.Handle;
const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class MusicSection extends Component {
  static propTypes = {
    options: PropTypes.object,
    onHandleTrack: PropTypes.func,
    onSliderChange: PropTypes.func,
    onRandomToggle: PropTypes.func,
    onLoopToggle: PropTypes.func,
    onVolumeToggle: PropTypes.func
  }

  static defaultProps = {
    options: {},
    onHandleTrack: () => {},
    onSliderChange: () => {},
    onRandomToggle: () => {},
    onLoopToggle: () => {},
    onVolumeToggle: () => {}
  }

  render() {
    const { options } = this.props;

    return (
      <div>
        {
          options.activeTrack &&
          <div className="track-container">
            <div className="track-info">
              <img className="track-icon" src={options.activeTrack.icon} alt="track preview" />
              <div className="track-title ellipsis">{options.activeTrack.name}</div>
              <div className="track-tools">
                <i className={`icon fa fa-random ${options.isRandom && 'active'}`} onClick={this.props.onRandomToggle} aria-hidden="true"></i>
                <i className={`icon fa fa-repeat ${options.isLoop && 'active'}`} onClick={this.props.onLoopToggle} aria-hidden="true"></i>
                <div className="volume-select">
                  <div className="volume-control">
                    <Slider vertical min={0} max={100} value={options.volumeLevel} onChange={this.props.onSliderChange} />
                  </div>
                  <i className={`icon fa-fw fa fa-volume-${options.volumeLevel ? 'up' : 'off'}`} onClick={this.props.onVolumeToggle} aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {/* <Slider min={0} max={100} defaultValue={options.volumeLevel} handle={handle} onChange={this.props.onSliderChange} /> */}
          </div>
        }

        <ul>
          {this.props.list.map(soundContent => (
            <li
              key={soundContent.id}
              className={`${options.activeTrack && options.activeTrack.id === soundContent.id && 'active'}`}
              onClick={() => this.props.onHandleTrack(soundContent)}>
              <i className={`icon fa fa-${options.isPlaying ? 'pause' : 'play'}`} aria-hidden="true"></i>
              <span className="track-name">{soundContent.name}</span>
            </li>
          ))}
        </ul>
        {
          options.activeTrack &&
          <ReactPlayer playing={options.isPlaying} loop={options.isLoop} volume={options.volumeLevel / 100} url={options.activeTrack.src} width={'100%'} height={'20px'} />
        }
      </div>
    )
  }
}

export default MusicSection;
