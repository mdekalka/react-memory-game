import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tooltip } from 'react-tippy';

import MusicSection from '../MusicSection/MusicSection'

import { BOARD_AVAILABLE_SIZES } from '../GameShellService';
import { musicList } from '../../config/soundAssets'

class GameMenu extends Component {
  static propTypes = {
    items: PropTypes.array,
    options: PropTypes.object,
    errors: PropTypes.object,
    onMenuToggle: PropTypes.func,
    onSizeItemClick: PropTypes.func,
    onImageSelect: PropTypes.func,
    onStepLimitToggle: PropTypes.func,
    isOptionsInvalid: PropTypes.func
  }

  static defaultProps = {
    items: [],
    options: {},
    errors: {},
    onMenuToggle: () => {},
    onSizeItemClick: () => {},
    onImageSelect: () => {},
    onStepLimitToggle: () => {},
    isOptionsInvalid: () => {}
  }

  static VOLUME_LEVEL = 1;

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
      volumeLevel: GameMenu.VOLUME_LEVEL
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

  onHandleTrack = (track) => {
    const { isPlaying, activeTrack } = this.state.soundConfig;

    // clicked on the same track
    if (activeTrack && activeTrack.id === track.id) {
      this.onSoundConfigChange({
        isPlaying: !isPlaying
      });
    } else {
      this.onSoundConfigChange({
        isPlaying: true,
        activeTrack: track,
        duration: 0,
        played: 0,
      });
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
      isRandom: !isRandom
    });
  }

  onLoopToggle = () => {
    const { isLoop } = this.state.soundConfig;
    
    this.onSoundConfigChange({
      isLoop: !isLoop
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
        activeTrack: musicList[index]
      });
    } else {
      if (currentIndex !== 0) {
        this.onSoundConfigChange({
          activeTrack: musicList[currentIndex - 1]
        });
      }
    }
  }

  onEnded = (a) => {
    const { isLoop } = this.state.soundConfig;

    if (isLoop) {

    } else {
      
    }
  }

  render() {
    const stepsLimit = this.props.options.stepsLimit;
    const opti = this.props.isOptionsInvalid();

    return (
      <div className="drawer-container">
        <div className="advanced-menu">
          <div className="menu-row-title nav-btn pointer" onClick={this.props.onMenuToggle}>
            <i className="fa fa-fw fa-angle-double-left" aria-hidden="true"></i>
            Save and Back
          </div>
          <div className="menu-row">
            <div className="menu-row-title">
              <Tooltip title="Welcome to React" animation="none" animateFill={false} duration={0} position="bottom">
                <i className="fa fa-fw fa-th-large" aria-hidden="true"></i>
                Board items count:
              </Tooltip>
            </div>
            <div className="menu-row-content">
              <ul className="size-list">
                {BOARD_AVAILABLE_SIZES.map((sizeItem, index) => (
                  <li onClick={() => this.props.onSizeItemClick(sizeItem)} className={classNames('size-item', {'active': sizeItem === this.props.options.size})} key={index}>{sizeItem}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="menu-row">
            <div className="menu-row-title">
              <i className="fa fa-fw fa-picture-o" aria-hidden="true"></i>
              Board images:
            </div>
            <div className="menu-row-content">
              <ul className="image-list">
                {this.props.items.map(imageItem => (
                  <li onClick={() => this.props.onImageSelect(imageItem)} className={classNames('image-item pointer', {'selected': imageItem.selected })} key={imageItem.key}>
                    <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                    <img className="image-picture" src={imageItem.image} alt="" />
                  </li>
                ))}
              </ul>
              <div className="notification-message error">{this.props.errors.invalidImageCount}</div>
            </div>
          </div>
          <div className="menu-row">
            <div className="menu-row-title">
              <i className="fa fa-fw fa-step-forward" aria-hidden="true"></i>
              Steps to end:
            </div>
            <div className="menu-row-content">
              <button className={classNames('btn', {'active': stepsLimit})} onClick={this.props.onStepLimitToggle}>
                {stepsLimit ? 'On' : 'Off'}
              </button>
              {
                stepsLimit &&
                <div className="notification-message">You will be have only <span className="highlight">{stepsLimit}</span> attempts to finish the game</div>
              }
            </div>
          </div>
          <div className="menu-row">
            <div className="menu-row-title">
              <i className="fa fa-music" aria-hidden="true"></i>
              Sound:
            </div>
            <div className="menu-row-content">
              <MusicSection 
                inputRef={player => this.player = player}
                list={this.state.musicList}
                options={this.state.soundConfig}
                onVolumeChange={this.onVolumeChange}
                onHandleTrack={this.onHandleTrack}
                onRandomToggle={this.onRandomToggle}
                onLoopToggle={this.onLoopToggle}
                onVolumeToggle={this.onVolumeToggle}
                onEnded={this.onEnded}
                onDuration={this.onDuration}
                onProgress={this.onProgress}
                onSeekMouseDown={this.onSeekMouseDown}
                onSeekMouseUp={this.onSeekMouseUp}
                onSeekChange={this.onSeekChange}
                onTrackMove={this.onTrackMove} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GameMenu;