import React, { Component } from 'react';
import moment from 'moment';
import sample from 'lodash/sample';

import SoundPlayer from '../SoundPlayer/SoundPlayer'

import { musicList } from '../../config/soundAssets';

import './SoundSection.scss';

class SoundSection extends Component {
  state = {
    soundConfig: {
      duration: 0,
      played: 0,
      seeking: false,
      activeTrack: musicList[0],
      isPlaying: false,
      isRandom: false,
      isLoop: false,
      isMuted: false,
      volumeLevel: 10
    },
    musicList
  }
    onSoundConfigChange(config) {
    this.setState(({ soundConfig }) => ({
      soundConfig: {
        ...soundConfig,
        ...config
      }
    }));
  }

  setActiveTrack(track) {
    this.onSoundConfigChange({
      isPlaying: true,
      activeTrack: track,
      duration: 0,
      played: 0,
    });
  }

  onHandleTrack = (track) => {
    const { isPlaying, activeTrack } = this.state.soundConfig;

    // clicked on the same track
    if (activeTrack && activeTrack.id === track.id) {
      this.onSoundConfigChange({
        isPlaying: !isPlaying
      });
    } else {
      this.setActiveTrack(track);
    }
  }

  onVolumeChange = (volumeLevel) => {
    this.onSoundConfigChange({
      volumeLevel,
      isMuted: volumeLevel === 0 ? true : false
    });
  }

  onVolumeToggle = () => {
    const { isMuted } = this.state.soundConfig;

    this.onSoundConfigChange({
      isMuted: !isMuted
    });
  }

  onRandomToggle = () => {
    const { isRandom } = this.state.soundConfig;

    this.onSoundConfigChange({
      isRandom: !isRandom,
      isLoop: false
    });
  }

  onLoopToggle = () => {
    const { isLoop } = this.state.soundConfig;

    this.onSoundConfigChange({
      isLoop: !isLoop,
      isRandom: false
    });
  }

  onSeekMouseDown = () => {
    this.onSoundConfigChange({
      seeking: true
    });
  }

  onSeekChange = (value) => {
    this.onSoundConfigChange({
      played: value / 100
    });
  }

  onSeekMouseUp = (value) => {
    this.onSoundConfigChange({
      seeking: false
    });

    this.player.seekTo(value / 100)
  }

  onDuration = (duration) => {
    this.onSoundConfigChange({
      duration
    });
  }

  onProgress = (state) => {
    const { seeking } = this.state.soundConfig;

    if (!seeking) {
      this.onSoundConfigChange({
        played: state.played
      });
    }
  }

  onTrackMove = (isForward) => {
    const { activeTrack } = this.state.soundConfig;
    const currentIndex = this.state.musicList.findIndex(soundItem => soundItem.id === activeTrack.id);

    if (isForward) {
      let index = 0;

      if (currentIndex < this.state.musicList.length - 1) {
        index = currentIndex + 1;
      }

      this.onSoundConfigChange({
        activeTrack: musicList[index],
        duration: 0,
        played: 0
      });
    } else {
      if (currentIndex !== 0) {
        this.onSoundConfigChange({
          activeTrack: musicList[currentIndex - 1],
          duration: 0,
          played: 0
        });
      }
    }
  }

  getIndexesExpectCurrent() {
    const { activeTrack } = this.state.soundConfig;

    return this.state.musicList
      .filter(soundItem => soundItem.id !== activeTrack.id)
      .map(soundItem => soundItem.id);
  }

  onEnded = () => {
    const { isLoop, isRandom } = this.state.soundConfig;
    const indexesExpectCurrent = this.getIndexesExpectCurrent();

    if (isRandom) {
      const nextTrackId = sample(indexesExpectCurrent);
      const nextTrack = this.state.musicList.find(soundItem => soundItem.id === nextTrackId);

      this.setActiveTrack(nextTrack);
    } else if (!isLoop) {
      this.onTrackMove(true);
    }
  }

  isActiveTrack(soundContent) {
    return this.props.options.activeTrack && this.props.options.activeTrack.id === soundContent.id;
  }

  formatTime(time) {
    return moment.duration(time, 'seconds').format('m:ss', {
      trim: false
    });
  }

  render() {
    const { soundConfig } = this.props;

    return (
      <div>
        {
          !!soundConfig.activeTrack && <SoundPlayer config={soundConfig} />
        }

                  {/* <div className="track-container">
            <div className="track-info">
              <img className="track-icon" src={options.activeTrack.icon} alt="track preview" />
              <div className="track-play-control">
                <i
                  className={`icon fa fa-fw fa-${options.isPlaying ? 'pause' : 'play'}`}
                  onClick={() => this.props.onHandleTrack(options.activeTrack)}
                  aria-hidden="true">
                </i>
                <i className="icon fa fa-step-backward" onClick={() => this.props.onTrackMove()} aria-hidden="true"></i>
                <i className="icon fa fa-step-forward" onClick={() => this.props.onTrackMove(true)} aria-hidden="true"></i>
              </div>
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
            <div className="track-time">
              <time>{this.formatTime(options.duration * options.played)}</time>
              <time>{!!options.duration && this.formatTime(options.duration)}</time>
            </div>
            <SliderWithTooltip
              className='track-seek'
              min={0}
              max={100}
              value={Math.round(options.played * 100)}
              tipFormatter={() => this.formatTime(options.duration * options.played)}
              width={'100%'}
              onBeforeChange={this.props.onSeekMouseDown}
              onChange={this.props.onSeekChange}
              onAfterChange={this.props.onSeekMouseUp} />
          </div> */}

        <ul className="sound-list">
          {this.props.list.map(soundContent => (
            <li
              key={soundContent.id}
              className={`sound-item pointer ${this.isActiveTrack(soundContent) ? 'active' : ''}`}
              onClick={() => this.props.onHandleTrack(soundContent)}>
              <i className={`icon fa fa-fw fa-${options.isPlaying && this.isActiveTrack(soundContent) ? 'pause' : 'play'}`} aria-hidden="true"></i>
              <span className="track-name">{soundContent.name}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SoundSection;
