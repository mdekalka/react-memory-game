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
    onVolumeChange: PropTypes.func,
    onRandomToggle: PropTypes.func,
    onLoopToggle: PropTypes.func,
    onVolumeToggle: PropTypes.func,
    onEnded: PropTypes.func,
    onSeekChange: PropTypes.func,
    onDuration: PropTypes.func,
    onProgress: PropTypes.func
  }

  static defaultProps = {
    options: {},
    onHandleTrack: () => {},
    onVolumeChange: () => {},
    onRandomToggle: () => {},
    onLoopToggle: () => {},
    onVolumeToggle: () => {},
    onEnded: () => {},
    onSeekChange: () => {},
    onDuration: () => {},
    onProgress: () => {}
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
                    <Slider vertical min={0} max={100} value={options.isMuted ? 0 : options.volumeLevel} onChange={this.props.onVolumeChange} />
                  </div>
                  <i className={`icon fa-fw fa fa-volume-${options.isMuted ? 'off' : 'up'}`} onClick={this.props.onVolumeToggle} aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <Slider 
              className='track-seek'
              min={0}
              max={100}
              value={Math.round(options.played * 100)}
              width={'100%'}
              onBeforeChange={this.props.onSeekMouseDown}
              onChange={this.props.onSeekChange}
              onAfterChange={this.props.onSeekMouseUp} />
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
          <ReactPlayer 
            ref={this.props.inputRef}
            playing={options.isPlaying}
            loop={options.isLoop}
            volume={options.isMuted ? 0 : options.volumeLevel / 100}
            url={options.activeTrack.src}
            muted={options.isMuted}
            onDuration={this.props.onDuration}
            onProgress={this.props.onProgress}
            onEnded={this.props.onEnded}
            width={'100%'}
            height={'20px'} />
        }
      </div>
    )
  }
}

export default MusicSection;
